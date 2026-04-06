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
                        text: 'Les notions fondamentales du source-hacking',
                        link: '/source-hacking-tutorials/base/fundamental-concepts',
                    },
                    {
                        text: 'Les types de données en Rom-Hacking, dans le langage `C`',
                        link: '/source-hacking-tutorials/base/datatypes'
                    }
                ]
            },
            {
                text: 'Installation de `pokeemeraude`',
                items: [
                    {
                        text: 'Installation de `pokeemeraude` sur Windows',
                        link: '/source-hacking-tutorials/setting-up-the-decomps/windows-installation',
                    },
                    {
                        text: 'Installation de `pokeemeraude` sur Linux',
                        link: '/source-hacking-tutorials/setting-up-the-decomps/linux-installation',
                    },
                    {
                        text: 'Installation de `pokeemeraude` sur MacOS',
                        link: '/source-hacking-tutorials/setting-up-the-decomps/macos-installation'
                    }
                ]
            },
            {
                text: 'Tutoriels sur Git',
                items: [
                    {
                        text: 'Installation de Git',
                        link: '/source-hacking-tutorials/git/installing',
                    },
                    {
                        text: 'Fonctionnalités fondamentales de Git',
                        link: '/source-hacking-tutorials/git/fundamental-features'
                    },
                ]
            }
        ]
    }
] as DefaultTheme.Sidebar;