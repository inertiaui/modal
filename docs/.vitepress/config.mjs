import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Inertia Modal Documentation",
  head: [
    process.env.NODE_ENV === 'production' ? [
      'script',
      {
        defer: '',
        src: 'https://helloworld.protone.media/hey.js',
        'data-website-id': '553d745e-2115-4553-9d5d-bf4bc49052f5'
      }
    ] : [],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  description: "Documentation for the Inertia Modal package",
  base: process.env.NODE_ENV === 'production' ? '/inertia-modal/docs/' : null,
  cleanUrls: process.env.NODE_ENV === 'production',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Documentation', link: '/introduction' },
      { text: 'Demo', link: 'https://www.youtube.com/watch?v=KAKOosmWV14' },
      { text: 'Inertia UI portal', link: 'https://inertiaui.com/dashboard' }
    ],

    search: { provider: 'local' },

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          {text: 'Introduction', link: '/introduction'},
          {text: 'Requirements', link: '/requirements'},
          {text: 'Installation', link: '/installation'},
        ]
      },
      {
        text: 'Usage',
        items: [
          {text: 'Basic Usage', link: '/basic-usage'},
          {text: 'Configuration', link: '/configuration'},
          {text: 'Base Route/URL', link: '/base-route-url'},
          {text: 'Close Modal', link: '/close-modal'},
          {text: 'Event Bus', link: '/event-bus'},
          {text: 'Nested / Stacked Modals', link: '/nested-stacked-modals'},
          {text: 'Reload Props', link: '/reload-props'},
          {text: 'Local Modals', link: '/local-modals'},
          {text: 'Styling', link: '/styling'},
          {text: 'Headless Mode', link: '/headless-mode'},
        ]
      }
    ],

    logoLink: process.env.NODE_ENV === 'production' ? '/inertia-modal/docs/introduction' : '/introduction',

    aside: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/inertiaui/modal' },
      { icon: 'twitter', link: 'https://twitter.com/pascalbaljet' },
      { icon: 'youtube', link: 'https://youtube.com/pascalbaljet' },
    ]
  }
})
