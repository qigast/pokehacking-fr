import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "pokehacking-fr",
  description: "Un site de référence français pour le Rom-Hacking des jeux Pokémon de la 3G!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Projets de source-hacking', link: '/source-hacking-projects/decomps/pokeemeraude' },
      { text: 'Tutoriels de source-hacking', link: '/source-hacking-tutorials' },
      { text: 'Projet “Pokémon - Version Disthène”', link: '/disthene' }
    ],

    sidebar: [
      {
        text: 'Projets de source-hacking',
        items: [
          {
            text: 'Rom-Hacks',
            items: [
              {
                text: 'Qualité de Vie',
                link: '/source-hacking-projects/custom/qol-list',
              }
            ]
          },
          {
            text: 'Décompilations',
            items: [
              {
                text: 'Pokémon - Version Emeraude',
                link: '/source-hacking-projects/decomps/pokeemeraude',
              },
              {
                text: 'Pokémon - Version Rouge Feu et Vert Feuille',
                link: '/source-hacking-projects/decomps/pokerougefeu',
              },
              {
                text: 'Pokémon - Version Rubis et Saphir',
                link: '/source-hacking-projects/decomps/pokerubis',
              }
            ]
          },
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
      level: "deep",
    },

    darkModeSwitchLabel: 'Apparence',
    lightModeSwitchTitle: 'Mode clair',
    darkModeSwitchTitle: 'Mode sombre',
    returnToTopLabel: 'Retour en haut',

    notFound: {
      title: 'PAGE INTROUVABLE',
      linkText: 'Retourner à l\'accueil',
      quote: 'Oups, la page que vous cherchez n\'existe pas !'
    }
  }
})
