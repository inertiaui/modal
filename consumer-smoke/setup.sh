#!/usr/bin/env bash
#
# Build a throwaway Laravel + Inertia app and install Inertia Modal exactly the
# way a paying customer does:
#
#   * the package is a clean, dist-only copy inside vendor/ (as Composer ships it)
#   * installed with REAL npm through the file: protocol
#   * NO Vite `dedupe` anywhere
#
# That combination is what surfaces a duplicate Inertia/Vue/React copy in the
# production bundle. The demo-app can never catch it: it links the library
# through the pnpm workspace from a sibling directory, where resolution and
# dedupe behave differently than in a real install.
#
# When this script finishes, the consumer app is production-built and ready to
# serve. Point smoke.mjs at it to assert the modal opens via the Inertia router
# with only one Inertia copy bundled.
#
# Modal 2.x targets Inertia 2.x only, so there is a single Inertia axis here.
#
# Usage (all required except NPM/PHP):
#   STACK=vue|react  MODAL_REPO=<repo>  WORK=<scratch>  [NPM=<npm>]  [PHP=<php>]  setup.sh
#
# The consumer app directory is printed on the last line.

set -euo pipefail

STACK="${STACK:?set STACK=vue|react}"
MODAL_REPO="${MODAL_REPO:?set MODAL_REPO=/path/to/modal}"
WORK="${WORK:?set WORK=/path/to/scratch}"
NPM="${NPM:-npm}"          # must be real npm, never a pnpm shim
PHP="${PHP:-php}"          # e.g. php83 on some runners
STUBS="$MODAL_REPO/consumer-smoke/stubs"

CONSUMER="$WORK/consumer-$STACK"   # the generated app
SHIPPED="$WORK/shipped-$STACK"     # the package as Composer would ship it

step() { printf '\n==> %s\n' "$1"; }

rm -rf "$CONSUMER" "$SHIPPED"

# ---------------------------------------------------------------------------
# 1. Build the package exactly as it ships inside vendor/.
#
# `git archive` honors export-ignore, so it yields src + react/ + vue/ +
# package.json with no demo-app, docs, or tests. The built dist is committed, so
# it comes along too. A concrete version lets a Composer path repo resolve it.
# ---------------------------------------------------------------------------
step "stage the shippable package"
mkdir -p "$SHIPPED"
git -C "$MODAL_REPO" archive HEAD | tar -x -C "$SHIPPED"
# Overlay the freshly built dist so the smoke tests the current source rather
# than whatever dist happens to be committed.
cp -R "$MODAL_REPO/$STACK/dist/." "$SHIPPED/$STACK/dist/"
node -e 'const f=process.argv[1]+"/composer.json",j=require(f);j.version="2.99.0";require("fs").writeFileSync(f,JSON.stringify(j,null,4))' "$SHIPPED"

# ---------------------------------------------------------------------------
# 2. Scaffold from a pinned starter-kit commit.
#
# Pinned commits are deterministic; `laravel new` tracks the latest installer
# and starter and drifts. Both commits ship Inertia v2, matching Modal 2.x.
# ---------------------------------------------------------------------------
case "$STACK" in
    vue)   STARTER_REPO="laravel/vue-starter-kit";   STARTER_SHA="d65a84789dfa8331c6ef78637371652ff617cc32" ;;
    react) STARTER_REPO="laravel/react-starter-kit"; STARTER_SHA="fed63b6068637de26e3dd1f9db874b2a06c205e7" ;;
    *) echo "unknown STACK: $STACK" >&2; exit 2 ;;
esac

step "scaffold $STARTER_REPO @ ${STARTER_SHA:0:7} ($STACK)"
git clone --quiet "https://github.com/$STARTER_REPO" "$CONSUMER"
git -C "$CONSUMER" checkout --quiet "$STARTER_SHA"

cd "$CONSUMER"
cp .env.example .env
composer install --no-interaction --no-progress --quiet
"$PHP" artisan key:generate --quiet
touch database/database.sqlite

# ---------------------------------------------------------------------------
# 3. Install the modal package the customer way.
#
# Composer copies the staged package into vendor/ (symlink:false). Then real npm
# installs it from vendor/ via file:, pulling only its runtime dependencies. A
# package that still carried its build devDependencies would drag a second
# Inertia copy in here and break the production build.
# ---------------------------------------------------------------------------
step "install the modal package (composer copy + real-npm file:)"
composer config repositories.modal "{\"type\":\"path\",\"url\":\"$SHIPPED\",\"options\":{\"symlink\":false}}"
composer require "inertiaui/modal:2.99.0" -W --no-interaction --no-progress

"$NPM" install --no-audit --no-fund
"$NPM" install --no-audit --no-fund "vendor/inertiaui/modal/$STACK"

# ---------------------------------------------------------------------------
# 4. Wire a minimal modal smoke page (stubs live in consumer-smoke/stubs).
#
# The JS entry is replaced with a tiny modal-wired bootstrap, two pages are
# added (base page + modal), the route is appended so the starter's own routes
# stay intact, and the package source is added to Tailwind's @source list.
# ---------------------------------------------------------------------------
step "wire the modal smoke page"
if [ "$STACK" = "vue" ]; then
    cp "$STUBS/app-vue.ts" resources/js/app.ts
    cp "$STUBS/ModalSmoke.vue" resources/js/pages/ModalSmoke.vue
    cp "$STUBS/Greet.vue" resources/js/pages/Greet.vue
    perl -0pi -e "s{(\@source '\.\./\.\./storage/framework/views/\*\.php';)}{\$1\n\@source '../../vendor/inertiaui/modal/vue/src/**/*.{js,ts,vue}';}" resources/css/app.css
else
    cp "$STUBS/app-react.tsx" resources/js/app.tsx
    cp "$STUBS/ModalSmoke.tsx" resources/js/pages/ModalSmoke.tsx
    cp "$STUBS/Greet.tsx" resources/js/pages/Greet.tsx
    perl -0pi -e "s{(\@source '\.\./views';)}{\$1\n\@source '../../vendor/inertiaui/modal/react/src/**/*.{js,jsx,ts,tsx}';}" resources/css/app.css
fi

cat "$STUBS/web-append.php" >> routes/web.php

# ---------------------------------------------------------------------------
# 5. Production build + migrate.
# ---------------------------------------------------------------------------
step "production build"
rm -f public/hot
"$NPM" run build

step "migrate"
"$PHP" artisan migrate --force --quiet

step "installed Inertia copies (must be a single version)"
[ "$STACK" = "vue" ] && INERTIA_PKG="@inertiajs/vue3" || INERTIA_PKG="@inertiajs/react"
"$NPM" ls "$INERTIA_PKG" || true

echo "$CONSUMER"
