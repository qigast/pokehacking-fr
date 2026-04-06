import { DefaultTheme } from "vitepress";

export default [
    {
        text: 'Projets de source-hacking',
        items: [
            {
                text: 'I. Rom-Hacks',
                items: [
                    {
                        text: 'Qualité de Vie',
                        link: '/source-hacking-projects/custom/qol-list',
                    }
                ]
            },
            {
                text: 'II. Décompilations',
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
                text: 'I. Tutoriels de base',
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
                text: 'II. Installation de `pokeemeraude`',
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
                text: 'III. Tutoriels sur Git',
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
            },
            {
                text: 'IV. Tutoriels de Mapping',
                items: [
                    {
                        text: 'Installation de Porymap',
                        link: '/source-hacking-tutorials/mapping/installing-porymap',
                    },
                    {
                        text: 'Les notions fondamentales du mapping',
                        link: '/source-hacking-tutorials/mapping/fundamental-concepts',
                    },
                    {
                        text: 'Manipuler une map (création, modification, etc.)',
                        link: '/source-hacking-tutorials/mapping/manipulate-a-map',
                    },
                    {
                        text: 'Suppression d\'une map',
                        link: '/source-hacking-tutorials/mapping/deleting-a-map',
                    }
                ]
            },
            {
                text: 'V. Tutoriels de Scripting',
                items: [
                    {
                        text: 'Les notions fondamentales du scripting',
                        link: '/source-hacking-tutorials/scripting/fundamental-concepts',
                    },
                    {
                        text: "Le scripting, concrètement",
                        link: '/source-hacking-tutorials/scripting/concrete-scripting'
                    },
                    {
                        text: "Les messages",
                        link: '/source-hacking-tutorials/scripting/object-event-messages',
                    },
                    {
                        text: "Les états des objets",
                        link: '/source-hacking-tutorials/scripting/object-event-states',
                    },
                    {
                        text: "Le warping",
                        link: '/source-hacking-tutorials/scripting/warping'
                    },
                    {
                        text: 'Les combats de dresseurs',
                        link: '/source-hacking-tutorials/scripting/trainer-battles'
                    },
                    {
                        text: "Les Pokémons",
                        link: '/source-hacking-tutorials/scripting/pokemon',
                    },
                    {
                        text: "Les objets du sac",
                        link: '/source-hacking-tutorials/scripting/bag-items',
                    },
                    {
                        text: "L'argent",
                        link: '/source-hacking-tutorials/scripting/money',
                    },
                    {
                        text: "Instructions intéressantes",
                        link: '/source-hacking-tutorials/scripting/interesting-instructions'
                    }
                ]
            },
            {
                text: 'VI. Tutoriels de Scripting (PoryScript)',
                items: [
                    {
                        text: 'Installation de PoryScript',
                        link: '/source-hacking-tutorials/poryscript/installation',
                    },
                    {
                        text: 'Avantages de PoryScript',
                        link: '/source-hacking-tutorials/poryscript/advantages'
                    },
                    {
                        text: "Le contrôle du flux d'éxecution des scripts",
                        link: '/source-hacking-tutorials/poryscript/control-flow',
                    }
                ]
            }
        ]
    },
    {
        text: 'How-To du source-hacking',
        items: [
            {
                text: 'Les notions fondamentales du How-To du source-hacking',
                link: '/source-hacking-how-to/base/fundamental-concepts.md',
            },
            {
                text: 'Mettre en place VSCode',
                items: [
                    {
                        text: 'Installer VSCode',
                    },
                    {
                        text: 'Installer et configurer Microsoft C/C++'
                    },
                ]
            },
            {
                text: 'Ajouter le Split Physique/Spécial',
                items: [
                    {
                        text: 'Ajouter la fonctionnalité du Split PSS',
                    },
                    {
                        text: "Charger les icônes dans l'écran de résumé des Pokémon",
                    },
                    {
                        text: "Charger les icônes dans les menus en combat"
                    }
                ]
            },
        ]
    }
] as DefaultTheme.Sidebar;