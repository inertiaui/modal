import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createInertiaUiDocsConfig, createInertiaUiSeoTransform, extractInertiaUiDescription, inertiaUiHead } from '@inertiaui/docs-theme'
import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

const sharedConfig = createInertiaUiDocsConfig({
    productSlug: 'inertia-modal',
    githubLink: 'https://github.com/inertiaui/modal',
})
const DOCS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE_NAME = 'Inertia Modal Documentation'
const SITE_TITLE_SUFFIX = 'Inertia Modal'
const SITE_URL = 'https://inertiaui.com/inertia-modal/docs'
const SITE_BASE_URL = 'https://inertiaui.com/inertia-modal'
const SITE_DESCRIPTION =
    'Open Laravel and Inertia.js routes in accessible Vue and React modals or slideovers without changing existing controllers.'
const AUTHOR_NAME = 'Pascal Baljet'
const AUTHOR_URL = 'https://pascalbaljet.dev'
const ORGANIZATION = 'Inertia UI'
const ORGANIZATION_URL = 'https://inertiaui.com'
const OG_IMAGE = 'https://inertiaui.com/inertia-modal/docs/icon-1024x1024.png'
const TWITTER_HANDLE = '@pascalbaljet'
const SOFTWARE_REQUIREMENTS = 'PHP 8.2+, Laravel 12+, Inertia Laravel 3+, Vue 3.4+ or React 19, Tailwind CSS 4+'
const ARTICLE_DEPENDENCIES = 'See the versioned Requirements page for Laravel, Inertia.js, Vue, React, and Tailwind CSS compatibility.'

const v0Sidebar = [
    {
        text: 'Getting Started',
        items: [
            { text: 'Introduction', link: '/v0/introduction' },
            { text: 'Requirements', link: '/v0/requirements' },
            { text: 'Installation', link: '/v0/installation' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Basic Usage', link: '/v0/basic-usage' },
            { text: 'Configuration', link: '/v0/configuration' },
            { text: 'Modal Props', link: '/v0/modal-props' },
            { text: 'Base Route / URL', link: '/v0/base-route-url' },
            { text: 'Close Modal', link: '/v0/close-modal' },
            { text: 'Event Bus', link: '/v0/event-bus' },
            { text: 'Nested / Stacked Modals', link: '/v0/nested-stacked-modals' },
            { text: 'Reload Props', link: '/v0/reload-props' },
            { text: 'Lazy Props', link: '/v0/lazy-props' },
            { text: 'Deferred Props', link: '/v0/deferred-props' },
            { text: 'Load When Visible', link: '/v0/load-when-visible' },
            { text: 'Local Modals', link: '/v0/local-modals' },
            { text: 'Styling', link: '/v0/styling' },
        ],
    },
    {
        text: 'Advanced',
        items: [
            { text: 'Custom App Mounting', link: '/v0/custom-app-mounting' },
            { text: 'Headless Mode', link: '/v0/headless-mode' },
        ],
    },
]

const v2Sidebar = [
    {
        text: 'Getting Started',
        items: [
            { text: 'Introduction', link: '/v2/introduction' },
            { text: 'Requirements', link: '/v2/requirements' },
            { text: 'Installation', link: '/v2/installation' },
            { text: 'Upgrade Guide', link: '/v2/upgrade-guide' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Basic Usage', link: '/v2/basic-usage' },
            { text: 'Configuration', link: '/v2/configuration' },
            { text: 'Modal Props', link: '/v2/modal-props' },
            { text: 'Base Route / URL', link: '/v2/base-route-url' },
            { text: 'Close Modal', link: '/v2/close-modal' },
            { text: 'Event Bus', link: '/v2/event-bus' },
            { text: 'Nested / Stacked Modals', link: '/v2/nested-stacked-modals' },
            { text: 'Reload Props', link: '/v2/reload-props' },
            { text: 'Lazy Props', link: '/v2/lazy-props' },
            { text: 'Deferred Props', link: '/v2/deferred-props' },
            { text: 'Load When Visible', link: '/v2/load-when-visible' },
            { text: 'Local Modals', link: '/v2/local-modals' },
            { text: 'Styling', link: '/v2/styling' },
        ],
    },
    {
        text: 'Advanced',
        items: [
            { text: 'Custom App Mounting', link: '/v2/custom-app-mounting' },
            { text: 'Headless Mode', link: '/v2/headless-mode' },
        ],
    },
]

const v3Sidebar = [
    {
        text: 'Getting Started',
        items: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Requirements', link: '/requirements' },
            { text: 'Installation', link: '/installation' },
            { text: 'Upgrade Guide', link: '/upgrade-guide' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Basic Usage', link: '/basic-usage' },
            { text: 'Configuration', link: '/configuration' },
            { text: 'Modal Props', link: '/modal-props' },
            { text: 'Base Route / URL', link: '/base-route-url' },
            { text: 'Close Modal', link: '/close-modal' },
            { text: 'Event Bus', link: '/event-bus' },
            { text: 'Nested / Stacked Modals', link: '/nested-stacked-modals' },
            { text: 'Reload Props', link: '/reload-props' },
            { text: 'Lazy Props', link: '/lazy-props' },
            { text: 'Deferred Props', link: '/deferred-props' },
            { text: 'Load When Visible', link: '/load-when-visible' },
            { text: 'Local Modals', link: '/local-modals' },
            { text: 'Styling', link: '/styling' },
        ],
    },
    {
        text: 'Advanced',
        items: [
            { text: 'Custom App Mounting', link: '/custom-app-mounting' },
            { text: 'Headless Mode', link: '/headless-mode' },
        ],
    },
]

// Build rewrites: v3/foo.md -> foo.md (v3 is default/stable)
const v3Files = [
    'introduction',
    'requirements',
    'installation',
    'upgrade-guide',
    'basic-usage',
    'configuration',
    'modal-props',
    'base-route-url',
    'close-modal',
    'event-bus',
    'nested-stacked-modals',
    'reload-props',
    'lazy-props',
    'deferred-props',
    'load-when-visible',
    'local-modals',
    'styling',
    'custom-app-mounting',
    'headless-mode',
]

const rewrites = {}
for (const file of v3Files) {
    rewrites[`v3/${file}.md`] = `${file}.md`
}

function descriptionForPage(relativePath, fallback) {
    const candidates = [relativePath]

    if (relativePath === 'index.md') {
        candidates.push('v3/introduction.md')
    } else if (!relativePath.startsWith('v0/') && !relativePath.startsWith('v2/')) {
        candidates.push(`v3/${relativePath}`)
    }

    for (const candidate of candidates) {
        try {
            const filePath = path.resolve(DOCS_ROOT, candidate)
            return extractInertiaUiDescription(fs.readFileSync(filePath, 'utf-8'), fallback)
        } catch {
            // Try the next source path candidate.
        }
    }

    return fallback
}

function sectionFor(slug) {
    const versionPrefix = slug.startsWith('v0/') || slug.startsWith('v2/') ? slug.split('/')[0] : ''
    const pageSlug = versionPrefix ? slug.slice(versionPrefix.length + 1) : slug
    const baseUrl = versionPrefix ? `${SITE_URL}/${versionPrefix}` : SITE_URL
    const gettingStarted = ['introduction', 'requirements', 'installation', 'upgrade-guide']
    const usage = [
        'basic-usage',
        'configuration',
        'modal-props',
        'base-route-url',
        'close-modal',
        'event-bus',
        'nested-stacked-modals',
        'reload-props',
        'lazy-props',
        'deferred-props',
        'load-when-visible',
        'local-modals',
        'styling',
    ]

    if (gettingStarted.includes(pageSlug)) return { name: 'Getting Started', url: `${baseUrl}/introduction` }
    if (usage.includes(pageSlug)) return { name: 'Usage', url: `${baseUrl}/basic-usage` }

    return { name: 'Advanced', url: `${baseUrl}/custom-app-mounting` }
}

const transformPageData = createInertiaUiSeoTransform({
    siteName: SITE_NAME,
    siteTitleSuffix: SITE_TITLE_SUFFIX,
    siteUrl: SITE_URL,
    siteBaseUrl: SITE_BASE_URL,
    siteDescription: SITE_DESCRIPTION,
    ogImage: OG_IMAGE,
    authorName: AUTHOR_NAME,
    authorUrl: AUTHOR_URL,
    organization: ORGANIZATION,
    organizationUrl: ORGANIZATION_URL,
    articleDependencies: ARTICLE_DEPENDENCIES,
    descriptionForPage,
    sectionFor,
    softwareApplication: ({ ids }) => ({
        name: SITE_TITLE_SUFFIX,
        alternateName: ['Inertia Modal for Laravel', 'Inertia UI Modal'],
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Laravel package, Inertia.js modal library, UI component library',
        operatingSystem: 'Cross-platform',
        url: SITE_BASE_URL,
        installUrl: `${SITE_URL}/installation`,
        sameAs: ['https://github.com/inertiaui/modal', 'https://github.com/inertiaui', 'https://twitter.com/pascalbaljet'],
        description: SITE_DESCRIPTION,
        author: { '@id': ids.person },
        publisher: { '@id': ids.organization },
        creator: { '@id': ids.person },
        offers: {
            '@type': 'Offer',
            name: 'Inertia Modal MIT License',
            description: 'Open-source Laravel, Vue, and React modal package for Inertia.js applications.',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: 'https://github.com/inertiaui/modal',
            category: 'Open-source package',
        },
        softwareRequirements: SOFTWARE_REQUIREMENTS,
        featureList: [
            'Route-based modals and slideovers',
            'Vue and React frontend packages',
            'Base route and base URL support',
            'Nested and stacked modals',
            'Reusable local modals',
            'Lazy, deferred, and visible prop loading',
            'Headless mode',
            'Native HTML dialog support',
            'TypeScript type definitions',
        ],
        image: OG_IMAGE,
    }),
    installationHowTo: ({ canonicalUrl }) => ({
        name: 'Install Inertia Modal for Laravel + Inertia.js',
        description: 'Step-by-step installation of Inertia Modal in a Laravel + Inertia.js application.',
        totalTime: 'PT5M',
        supply: [
            { '@type': 'HowToSupply', name: 'Laravel 12+ application' },
            { '@type': 'HowToSupply', name: 'Inertia.js v3 application' },
            { '@type': 'HowToSupply', name: 'Vue 3.4+ or React 19 frontend' },
            { '@type': 'HowToSupply', name: 'Tailwind CSS 4+' },
        ],
        tool: [
            { '@type': 'HowToTool', name: 'Composer' },
            { '@type': 'HowToTool', name: 'npm, pnpm, or bun' },
        ],
        step: [
            {
                '@type': 'HowToStep',
                position: 1,
                name: 'Install the PHP package',
                text: 'Run composer require inertiaui/modal:^3.0.0 to install the Laravel package.',
                url: `${canonicalUrl}#composer-installation`,
            },
            {
                '@type': 'HowToStep',
                position: 2,
                name: 'Install the frontend package',
                text: 'Install the Vue or React package from Composer vendor files or from npm.',
                url: `${canonicalUrl}#npm-installation`,
            },
            {
                '@type': 'HowToStep',
                position: 3,
                name: 'Register the modal root',
                text: 'Wrap your Inertia app with the Vue or React modal integration so route responses can render in modals.',
                url: `${canonicalUrl}#inertia-js-configuration`,
            },
            {
                '@type': 'HowToStep',
                position: 4,
                name: 'Configure Tailwind CSS',
                text: 'Add the package source path to Tailwind so modal utility classes are included in your CSS output.',
                url: `${canonicalUrl}#tailwind-configuration`,
            },
        ],
    }),
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
    ...sharedConfig,
    title: SITE_NAME,
    titleTemplate: `:title - ${SITE_TITLE_SUFFIX}`,
    head: inertiaUiHead([
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', href: '/apple-icon.png' }],
        ['meta', { name: 'theme-color', content: '#7e57c2' }],
        ['meta', { name: 'author', content: AUTHOR_NAME }],
        ['meta', { name: 'publisher', content: ORGANIZATION }],
        ['meta', { name: 'application-name', content: SITE_TITLE_SUFFIX }],
        ['meta', { name: 'apple-mobile-web-app-title', content: SITE_TITLE_SUFFIX }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: SITE_NAME }],
        ['meta', { property: 'og:image', content: OG_IMAGE }],
        ['meta', { property: 'og:image:width', content: '1024' }],
        ['meta', { property: 'og:image:height', content: '1024' }],
        ['meta', { property: 'og:image:alt', content: 'Inertia Modal, route-based modals and slideovers for Laravel and Inertia.js' }],
        ['meta', { property: 'og:locale', content: 'en_US' }],
        ['meta', { name: 'twitter:card', content: 'summary' }],
        ['meta', { name: 'twitter:site', content: TWITTER_HANDLE }],
        ['meta', { name: 'twitter:creator', content: TWITTER_HANDLE }],
        ['meta', { name: 'twitter:image', content: OG_IMAGE }],
        ['meta', { name: 'twitter:image:alt', content: 'Inertia Modal, route-based modals and slideovers for Laravel and Inertia.js' }],
        ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }],
    ]),
    description: SITE_DESCRIPTION,
    lastUpdated: true,
    sitemap: {
        hostname: `${SITE_URL}/`,
    },
    rewrites,
    themeConfig: {
        ...sharedConfig.themeConfig,
        siteTitle: 'Modal Documentation',

        nav: [
            {
                text: 'v3',
                items: [
                    { text: 'v3 (Inertia 3) — current', link: '/introduction', activeMatch: '^/(?!v[0-9])' },
                    { text: 'v2 (Inertia 2)', link: '/v2/introduction', activeMatch: '^/v2/' },
                    { text: 'v0 (Unsupported)', link: '/v0/introduction', activeMatch: '^/v0/' },
                ],
                activeMatch: '.',
            },
            { text: 'Demo', link: 'https://www.youtube.com/watch?v=KAKOosmWV14' },
            { text: 'Inertia UI portal', link: 'https://inertiaui.com/dashboard' },
        ],

        sidebar: {
            '/v0/': v0Sidebar,
            '/v2/': v2Sidebar,
            '/': v3Sidebar,
        },
    },
    transformPageData,
    vite: {
        plugins: [llmstxt()],
    },
})
