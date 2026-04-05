import { defineConfig } from 'vitepress'

const siteUrl = 'https://pokehacking-fr.web.app'
const siteDescription = 'Un site de référence français pour le Rom-Hacking des jeux Pokémon de la 3G!'
const siteKeywords = 'pokemon, source-hacking, rom-hacking, gba, decompilation, pokemon emeraude, pokemon rubis, pokemon saphir, pokemon rouge feu, pokemon vert feuille, tutoriel, francais, french, hacking, hack-rom, pokeemeraude, pokerougefeu, pokerubis, pokeemerald, pokefirered, pokeruby'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'fr-FR',
  base: '/',
  cleanUrls: true,
  sitemap: {
    hostname: siteUrl,
  },
  lastUpdated: true,
  head: [
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'keywords', content: siteKeywords }],
    ['meta', { name: 'author', content: 'Qigast' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'fr_FR' }],
    ['meta', { property: 'og:site_name', content: 'pokehacking-fr' }],
    ['meta', { property: 'og:title', content: 'pokehacking-fr' }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:url', content: siteUrl }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'pokehacking-fr' }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'pokehacking-fr',
      url: siteUrl,
      inLanguage: 'fr-FR',
      description: siteDescription,
      keywords: siteKeywords,
      publisher: {
        '@type': 'Person',
        name: 'Qigast',
      },
    })],
  ],
  transformHead: ({ pageData }) => {
    const relativePath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const pagePath = relativePath ? `/${relativePath}` : '/'
    const canonicalUrl = `${siteUrl}${pagePath}`

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
    ]
  },
  title: "pokehacking-fr",
  description: siteDescription,
  ignoreDeadLinks: [
    /https:\/\/datomatic\.no-intro\.org\/.*/
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Projets de source-hacking', link: '/source-hacking-projects/decomps/pokeemeraude' },
      { text: 'Tutoriels de source-hacking', link: '/source-hacking-tutorials/base/source-hacking-deep-dive' },
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
      },
      {
        text: 'Tutoriels de source-hacking',
        items: [
          {
            text: 'Tutoriels de base',
            items: [
              {
                text: 'Le source-hacking, en profondeur',
                link: '/source-hacking-tutorials/base/source-hacking-deep-dive',
              }
            ]
          }
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
