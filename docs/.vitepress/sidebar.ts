import { DefaultTheme } from "vitepress";

export default [
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
                    },
                    {
                        text: 'Les types de données',
                        link: '/source-hacking-tutorials/base/datatypes'
                    }
                ]
            }
        ]
    }
] as DefaultTheme.Sidebar;