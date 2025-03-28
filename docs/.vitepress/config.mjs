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
          {text: 'Modal Props', link: '/modal-props'},
          {text: 'Base Route / URL', link: '/base-route-url'},
          {text: 'Close Modal', link: '/close-modal'},
          {text: 'Event Bus', link: '/event-bus'},
          {text: 'Nested / Stacked Modals', link: '/nested-stacked-modals'},
          {text: 'Reload Props', link: '/reload-props'},
          {text: 'Deferred Props', link: '/deferred-props'},
          {text: 'Load When Visible', link: '/load-when-visible'},
          {text: 'Local Modals', link: '/local-modals'},
          {text: 'Styling', link: '/styling'},
        ]
      },
      {
        text: 'Advanced',
        items: [
          {text: 'Custom App Mounting', link: '/custom-app-mounting'},
          {text: 'Headless Mode', link: '/headless-mode'},
        ]
      }
    ],

    logoLink: process.env.NODE_ENV === 'production' ? '/inertia-modal/docs/introduction' : '/introduction',

    aside: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/inertiaui/modal' },
      { icon: 'twitter', link: 'https://twitter.com/pascalbaljet' },
      { icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3C61.6-9.4 37.5-1.7 21.6 5.5C3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7c3.3-.5 6.6-.9 10-1.4c-3.3 .5-6.6 1-10 1.4C74.3 308.6-9.1 342.8 100.3 464.5C220.6 589.1 265.1 437.8 288 361.1c22.9 76.7 49.2 222.5 185.6 103.4c102.4-103.4 28.1-156-65.8-169.9c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3c64.1 7.1 133.6-15.1 153.2-80.7C566.9 194 576 75 576 58.4s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8C385.1 81.9 314.1 176.4 288 227.1z"/></svg>',
      }, link: 'https://bsky.app/profile/pascalbaljet.bsky.social' },
      { icon: 'youtube', link: 'https://youtube.com/pascalbaljet' },
    ]
  },
  transformPageData(pageData) {
    const canonicalUrl = `https://inertiaui.com/inertia-modal/docs/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  }
})
