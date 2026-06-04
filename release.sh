#!/usr/bin/env bash
set -euo pipefail

cd "$(cd "$(dirname "$0")" && pwd)"

RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[1;33m'
BLUE=$'\033[0;34m'
NC=$'\033[0m'

info()    { printf "%s==>%s %s\n" "$BLUE"   "$NC" "$*"; }
success() { printf "%s✓%s %s\n"   "$GREEN"  "$NC" "$*"; }
warn()    { printf "%s!%s %s\n"   "$YELLOW" "$NC" "$*"; }
die()     { printf "%s✗%s %s\n"   "$RED"    "$NC" "$*" >&2; exit 1; }

# ── args ────────────────────────────────────────────────────────────────
[ $# -eq 1 ] || die "Usage: $0 <version>  (e.g. 2.0.4 or 2.1.0-beta1)"

TAG="$1"
if [[ ! "$TAG" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.-]+)?$ ]]; then
    die "Invalid version: $TAG — expected X.Y.Z or X.Y.Z-suffix (no leading 'v')"
fi

VERSION="$TAG"
PRERELEASE=false
[[ "$TAG" == *-* ]] && PRERELEASE=true

MAJOR="${VERSION%%.*}"
[ "$MAJOR" = "2" ] || die "This script only handles 2.x releases (got $VERSION). Run it from the matching branch."

# ── required tools ──────────────────────────────────────────────────────
command -v composer >/dev/null || die "composer not found"
command -v pnpm     >/dev/null || die "pnpm not found"
command -v gh       >/dev/null || die "gh CLI not found"

# ── git state ───────────────────────────────────────────────────────────
info "Pre-flight checks"

git rev-parse --git-dir >/dev/null 2>&1 || die "Not a git repository"
[ -z "$(git status --porcelain)" ]      || die "Working tree is not clean — commit or stash first"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
LOCAL_HEAD=$(git rev-parse HEAD)
SHORT_HEAD=$(git rev-parse --short HEAD)

[ "$BRANCH" = "2.x" ] || die "2.x releases must be cut from '2.x' (currently on '$BRANCH')"

info "Fetching from origin..."
# --force: trust origin as the source of truth for tags (overwrites local tags
# whose SHA has drifted, e.g. from a manual rebase or rewrite of a release commit).
git fetch --tags --force origin

# Tag must not already exist
if git rev-parse --verify --quiet "refs/tags/$TAG" >/dev/null; then
    die "Tag $TAG already exists locally"
fi
if git ls-remote --tags --exit-code origin "refs/tags/$TAG" >/dev/null 2>&1; then
    die "Tag $TAG already exists on origin"
fi

# Branch must be in sync with remote
REMOTE_HEAD=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "")
if [ -z "$REMOTE_HEAD" ]; then
    die "Branch $BRANCH has no upstream on origin"
elif [ "$REMOTE_HEAD" != "$LOCAL_HEAD" ]; then
    REMOTE_SHORT=$(git rev-parse --short "origin/$BRANCH")
    die "Local $BRANCH ($SHORT_HEAD) is out of sync with origin/$BRANCH ($REMOTE_SHORT) — pull or push first"
fi

# ── CI check ────────────────────────────────────────────────────────────
info "Checking CI on $SHORT_HEAD..."
CI_FAILED=$(gh run list --branch "$BRANCH" --limit 20 --json headSha,conclusion \
    --jq "[.[] | select(.headSha == \"$LOCAL_HEAD\") | select(.conclusion == \"failure\" or .conclusion == \"cancelled\" or .conclusion == \"timed_out\" or .conclusion == \"action_required\")] | length")
CI_PENDING=$(gh run list --branch "$BRANCH" --limit 20 --json headSha,status \
    --jq "[.[] | select(.headSha == \"$LOCAL_HEAD\") | select(.status != \"completed\")] | length")
CI_PASSED=$(gh run list --branch "$BRANCH" --limit 20 --json headSha,conclusion \
    --jq "[.[] | select(.headSha == \"$LOCAL_HEAD\") | select(.conclusion == \"success\")] | length")

if [ "$CI_FAILED" != "0" ]; then
    die "$CI_FAILED CI workflow(s) failed on $SHORT_HEAD — fix before releasing"
fi

if [ "$CI_PENDING" != "0" ]; then
    warn "$CI_PENDING CI workflow(s) still running on $SHORT_HEAD"
    read -r -p "Continue anyway? (y/N) " REPLY
    [[ "$REPLY" =~ ^[Yy]$ ]] || die "Aborted"
elif [ "$CI_PASSED" = "0" ]; then
    warn "No CI runs found for $SHORT_HEAD"
    read -r -p "Continue anyway? (y/N) " REPLY
    [[ "$REPLY" =~ ^[Yy]$ ]] || die "Aborted"
else
    success "CI green ($CI_PASSED workflow(s) passed)"
fi

# ── confirm ─────────────────────────────────────────────────────────────
# 2.x is legacy — never mark as "latest" on GitHub regardless of pre-release status.
# (The publish-to-npm workflow also publishes 2.x to npm under the "legacy" dist-tag.)
MARK_LATEST=false

CURRENT_VUE=$(node -p "require('./vue/package.json').version")
CURRENT_REACT=$(node -p "require('./react/package.json').version")

echo
info "About to release:"
printf "  %-12s vue=%s, react=%s\n" "Current:"  "$CURRENT_VUE" "$CURRENT_REACT"
printf "  %-12s %s\n" "Version:"     "$VERSION"
printf "  %-12s %s\n" "Tag:"         "$TAG"
printf "  %-12s %s @ %s\n" "Branch:" "$BRANCH" "$SHORT_HEAD"
printf "  %-12s %s\n" "Pre-release:" "$PRERELEASE"
printf "  %-12s %s\n" "Mark latest:" "$MARK_LATEST"
echo
read -r -p "Proceed? (y/N) " REPLY
[[ "$REPLY" =~ ^[Yy]$ ]] || die "Aborted"

# ── bump versions ───────────────────────────────────────────────────────
info "Bumping vue/package.json to $VERSION..."
(cd vue && pnpm version "$VERSION" --no-git-tag-version --no-git-checks --allow-same-version >/dev/null)

info "Bumping react/package.json to $VERSION..."
(cd react && pnpm version "$VERSION" --no-git-tag-version --no-git-checks --allow-same-version >/dev/null)

# ── build ───────────────────────────────────────────────────────────────
info "Running composer build (quality + lint + dist)..."
composer build

# Verify `composer build` didn't leave unexpected source changes behind
# (e.g. Pint/Rector/ESLint auto-fixes on a previously "clean" tree).
# Expected modifications: package.json in vue/+react/, their dist/ dirs, and the root pnpm-lock.yaml.
UNEXPECTED_CHANGES=$(git status --porcelain \
    | grep -vE "^.M (react|vue)/dist/|^.M (react|vue)/package\.json$|^.M pnpm-lock\.yaml$|^\?\? (react|vue)/dist/" \
    || true)
if [ -n "$UNEXPECTED_CHANGES" ]; then
    echo
    warn "composer build modified unexpected source files:"
    echo "$UNEXPECTED_CHANGES"
    die "Commit those fixes first, then re-run this script"
fi

# ── verify dist ─────────────────────────────────────────────────────────
info "Verifying dist artifacts..."
for pkg in vue react; do
    for f in dist/inertiaui-modal.js dist/inertiaui-modal.umd.cjs dist/inertiaui-modal.d.ts; do
        [ -s "$pkg/$f" ] || die "Missing or empty: $pkg/$f"
    done
done
success "dist files present and non-empty"

# ── commit ──────────────────────────────────────────────────────────────
git add vue/package.json vue/dist \
        react/package.json react/dist \
        pnpm-lock.yaml

if git diff --cached --quiet; then
    warn "Nothing to commit (versions and dist unchanged)"
else
    info "Committing release..."
    git commit -m "$VERSION"
fi

# ── tag + push ──────────────────────────────────────────────────────────
info "Tagging $TAG..."
git tag "$TAG"

info "Pushing branch and tag..."
git push origin "$BRANCH"
git push origin "$TAG"

# ── github release ──────────────────────────────────────────────────────
info "Creating GitHub release..."
RELEASE_FLAGS=(--title "$TAG" --generate-notes --latest=false)
[ "$PRERELEASE" = true ] && RELEASE_FLAGS+=(--prerelease)
gh release create "$TAG" "${RELEASE_FLAGS[@]}"

echo
success "Released $TAG"
info "publish-to-npm workflow has been triggered by the release event (2.x publishes under the 'legacy' npm dist-tag)."
info "update-changelog workflow will commit CHANGELOG.md updates back to the 2.x branch."
info "Watch: gh run watch"
