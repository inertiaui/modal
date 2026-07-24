import { defineConfig } from 'vitepress'

/*
  Light: ink-on-paper with balanced product syntax accents.
  Dark: the same color meaning on a deep night surface.
*/
const inertiaModalLight = {
    name: 'inertia-modal-light',
    type: 'light',
    colors: {
        'editor.background': '#f6f7fb',
        'editor.foreground': '#111827',
    },
    tokenColors: [
        { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#9ca3af', fontStyle: 'italic' } },
        { scope: ['keyword', 'storage', 'storage.type', 'keyword.control', 'keyword.operator.new'], settings: { foreground: '#7e57c2', fontStyle: '' } },
        { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: '#15803d' } },
        { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#c2410c' } },
        { scope: ['variable', 'variable.other', 'variable.parameter', 'variable.language'], settings: { foreground: '#334155' } },
        {
            scope: ['support.function', 'entity.name.function', 'meta.function-call', 'meta.function-call entity.name.function'],
            settings: { foreground: '#2563eb' },
        },
        { scope: ['entity.name.class', 'entity.name.type', 'support.class', 'entity.other.inherited-class'], settings: { foreground: '#5b21b6' } },
        { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#2563eb' } },
        { scope: ['entity.other.attribute-name'], settings: { foreground: '#7e57c2' } },
        { scope: ['punctuation', 'meta.brace', 'punctuation.section'], settings: { foreground: '#64748b' } },
        { scope: ['variable.other.property', 'support.type.property-name'], settings: { foreground: '#334155' } },
        { scope: ['support.type', 'support.constant'], settings: { foreground: '#7e57c2' } },
    ],
}

const inertiaModalDark = {
    name: 'inertia-modal-dark',
    type: 'dark',
    colors: {
        'editor.background': '#1f1a2e',
        'editor.foreground': '#e8e3ec',
    },
    tokenColors: [
        { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#676e95', fontStyle: 'italic' } },
        { scope: ['keyword', 'storage', 'storage.type', 'keyword.control', 'keyword.operator.new'], settings: { foreground: '#c792ea', fontStyle: '' } },
        { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: '#c3e88d' } },
        { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#f78c6c' } },
        { scope: ['variable', 'variable.other', 'variable.parameter', 'variable.language'], settings: { foreground: '#a6accd' } },
        {
            scope: ['support.function', 'entity.name.function', 'meta.function-call', 'meta.function-call entity.name.function'],
            settings: { foreground: '#82aaff' },
        },
        { scope: ['entity.name.class', 'entity.name.type', 'support.class', 'entity.other.inherited-class'], settings: { foreground: '#ffcb6b' } },
        { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#89ddff' } },
        { scope: ['entity.other.attribute-name'], settings: { foreground: '#c792ea' } },
        { scope: ['punctuation', 'meta.brace', 'punctuation.section'], settings: { foreground: '#89ddff' } },
        { scope: ['variable.other.property', 'support.type.property-name'], settings: { foreground: '#a6accd' } },
        { scope: ['support.type', 'support.constant'], settings: { foreground: '#c792ea' } },
    ],
}

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

const productionHead =
    process.env.NODE_ENV === 'production'
        ? [
              [
                  'script',
                  {
                      async: '',
                      src: 'https://analytics.ahrefs.com/analytics.js',
                      'data-key': 'A06g5iU8TH9IWlCPkl0/OQ',
                  },
              ],
          ]
        : []

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Inertia Modal Documentation',
    titleTemplate: ':title · Inertia Modal',
    head: [
        ...productionHead,
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@100..900&family=Geist+Mono:wght@100..900&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Schibsted+Grotesk:wght@400..900&display=swap',
            },
        ],
    ],
    description: 'Documentation for the Inertia Modal package',
    base: process.env.NODE_ENV === 'production' ? '/inertia-modal/docs/' : null,
    outDir: process.env.NODE_ENV === 'production' ? './dist/inertia-modal/docs' : './dist',
    cleanUrls: process.env.NODE_ENV === 'production',
    markdown: {
        theme: { light: inertiaModalLight, dark: inertiaModalDark },
    },
    rewrites,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: {
            light: '/inertiaui-logo.svg',
            dark: '/inertiaui-logo-white.svg',
            alt: 'Inertia UI',
        },
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

        search: { provider: 'local' },

        sidebar: {
            '/v0/': v0Sidebar,
            '/v2/': v2Sidebar,
            '/': v3Sidebar,
        },

        logoLink: process.env.NODE_ENV === 'production' ? '/inertia-modal/docs/introduction' : '/introduction',

        aside: false,

        socialLinks: [
            { icon: 'github', link: 'https://github.com/inertiaui/modal' },
            { icon: 'twitter', link: 'https://twitter.com/pascalbaljet' },
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3C61.6-9.4 37.5-1.7 21.6 5.5C3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7c3.3-.5 6.6-.9 10-1.4c-3.3 .5-6.6 1-10 1.4C74.3 308.6-9.1 342.8 100.3 464.5C220.6 589.1 265.1 437.8 288 361.1c22.9 76.7 49.2 222.5 185.6 103.4c102.4-103.4 28.1-156-65.8-169.9c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3c64.1 7.1 133.6-15.1 153.2-80.7C566.9 194 576 75 576 58.4s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8C385.1 81.9 314.1 176.4 288 227.1z"/></svg>',
                },
                link: 'https://bsky.app/profile/pascalbaljet.bsky.social',
            },
            { icon: 'youtube', link: 'https://youtube.com/pascalbaljet' },
        ],
    },
    transformPageData(pageData) {
        const canonicalUrl = `https://inertiaui.com/inertia-modal/docs/${pageData.relativePath}`.replace(/index\.md$/, '').replace(/\.md$/, '')

        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push(['link', { rel: 'canonical', href: canonicalUrl }])
    },
})
