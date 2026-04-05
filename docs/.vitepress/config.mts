import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "pokehacking-fr",
  description: "Un site de référence français pour le Rom-Hacking des jeux Pokémon de la 3G!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qigast' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/qigast.bsky.social' }
    ],

    docFooter: {
      next: 'Article suivant',
      prev: 'Article précédent'
    },

    outline: {
      label: 'Dans cet article',
    },

    darkModeSwitchLabel: 'Apparence',
    lightModeSwitchTitle: 'Mode clair',
    darkModeSwitchTitle: 'Mode sombre',
    returnToTopLabel: 'Retour en haut',
  }
})
