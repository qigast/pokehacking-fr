# Le source-hacking, en profondeur
Tout d'abord, avant de bien commencer, je tiens à définir plusieurs termes qui seront utilisés dans tout ce site, et je tiens à repondre aux questions essentielles avant de "choisir" quelle approche prendre pour un projet de rom-hacking. C'est tout ce que cet article va couvrir, et je recommande fortement de le lire en entier avant de se lancer dans un projet de source-hacking, ou de rom-hacking en général.

## I. Termes
### 1. Fichier binaire
Un fichier binaire, ou un binaire, est un fichier qui contient des données formatées de telle façon à ce qu'elle ne sont pas "lisibles". Un binaire peut être un exécutable (comme un logiciel, un jeu, etc.), ou un fichier de données (une image, de la musique, etc.), ou une ROM (comme les jeux Pokémon de la 3G).

### 2. Source-hacking
Le source-hacking, ou "decomp hacking" en Anglais, provient de la contraction de "source code" et "hacking". Le terme "source code" fait référence au code source, ce qui *constitue* en quelque sorte un programme. Le terme "hacking" signifie l'acte de *modifier* ou de *manipuler* quelque chose afin d'atteindre un resultat souhaité.

## II. Qu'est-ce que le source-hacking ?
### 1. Grosso modo
Le source-hacking, dans notre contexte, est une technique de modification du code source des jeux Pokémon de la 3G (spécifiquement: Pokémon Emeraude, Rouge Feu, Vert Feuille, Rubis\* et Saphir\*) afin de créer des hacks roms. Entre autres, cela veut dire que le hacker manipulera le code (écrit en `C`) de ces jeux, mais aussi les données (sprites, fonds, musiques, maps, textes, etc.) pour arriver à ses fins.

::: tip INFO
\* Pokémon Rubis et Saphir n'ont pas encore été décompilées vers leurs versions Françaises, et sont généralement peu recommandables pour les débutants.
:::

Comme établi précédemment, le code source des jeux est écrit en `C`, c'est un langage de programmation de haut niveau (comparé à l'assembleur, par exemple), mais qui garde quand même une certaine proximité avec la machine. Ce langage est "écrit" dans des fichiers textuels, avec l'extension `.c` (pour les fichiers de code), et `.h` (pour les fichiers d'en-tête, qui contiennent des déclarations de fonctions, de variables, etc.). Ces fichiers textuels sont ensuite traités par un *compilateur*, qui donnera le binaire final.

::: warning ATTENTION
Les gens pensent souvent que le source-hacking nécessite une connaissance approfondie du langage `C`, mais ce n'est pas nécessairement vrai. Bien que cela soit *très* utile (que ce soit pour le source-hacking, ou pour les capacités de raisonnement en général), il est tout à fait possible de réaliser un projet sans *jamais* avoir à coder en `C` à proprement parler.
:::

::: tip INFO
Avoir une bonne compréhension, et être capable de suivre un tutoriel correctement jouent un rôle plus important à la réalisation d'un projet *relativement simple* que de savoir coder en `C`. Bien sûr, dans le cas où des erreurs surviennent, une bonne capacité à utiliser un moteur de recherche (comme `Google`) est aussi inestimable.
:::

Il existe de nombreuses ressources pour programmer en `C`, et si vous avez une quelconque précédente expérience que ce soit en assembleur (si vous venez du hacking binaire), ou en scripting (`XSE`, `HMA`, etc.), le langage paraîtra bien plus *simple à prendre en main*. 

::: tip INFO
La plus grande notion du langage `C` qui est souvent problématique est la gestion de la mémoire, et plus précisément les pointeurs. Cependant, les pointeurs ne sont que des variables qui contiennent des adresses, et encore, si vous venez du hacking binaire, le concept d'adresses (d'offsets) devrait vous être évident.
:::

### 2. `C` vs assembleur
Pour illustrer ma comparaison avec l'assembleur et le langage `C`, voici un exemple de "fonction" en assembleur qui retourne le nombre de Pokémon de votre équipe:
```
.thumb
.text
.align 2

.global GetPartyCount
GetPartyCount:
    push    {lr}
    ldr     r0, =gPartyCount
    ldrb    r0, [r0]
    pop     {pc}

gPartyCount:
    .word   0x02XXXXXX @ Données fabriquées pour l'exemple
```
Et voici la même fonction, en `C`:
```c
u8 GetPartyCount(void)
{
    return gPartyCount;
}
```

Comme on peut observer, la version en `C` est beaucoup plus simple à comprendre, et elle est beaucoup plus courte et concise. Je ne dis pas que `code plus court == qualité`, mais dans ce cas précis, il est *évident* que la version en `C` est bien meilleure dans tous les aspects.

### 3. `C` vs scripts de `XSE`
Dans le langage de `XSE`, pour verifier la valeur d'une variable, voici tout le code nécessaire:
```
#dynamic 0x08000000

#org @start
    if LAST_RESULT = TRUE goto @success
    goto @failure

#org @success
    # Execute something...
    end

#org @failure
    # Execute something else...
    end
```
Et voici une version en `C`:
```c
void foo(void) {
    if (VarGet(VAR_RESULT) == TRUE)
    {
        // Execute something...
    }
    else
    {
        // Execute something else...
    }
}
```
Comme pour la comparaison précédente, la version en `C` est bien plus simple à comprendre, et elle permet aussi d'éviter plusieurs complications, comme la définition de deux nouveaux labels, juste pour une condition, comme dans le script `XSE`.

Tout ça pour dire que, même si le langage `C` peut paraître intimidant au début, il est beaucoup plus simple à comprendre, à mettre en oeuvre, et à maintenir que l'assembleur ou les scripts de `XSE`<sup>1</sup>. 

## III. Qu'est-ce que la décompilation ?
Le terme "décompilation" est un nom qui peut faire référence à deux choses distinctes, mais qui sont néanmoins liées.

### 1. La décompilation, l'acte de décompiler
La décompilation, c'est l'acte de prendre un programme compilé (un binaire), et de transformer ce programme, d'abord en code "lisible" (généralement, en assembleur), puis en code source. Il est possible de faire la conversion en assembleur "*automatiquement*" (`luvdis`, `gbadisasm`, `arm-none-eabi-objdump`, etc.), mais la conversion en code source est un processus plus complexe, qui nécessite souvent une intervention humaine<sup>2</sup> (pour corriger les erreurs, ou pour réécrire des parties du code qui sont difficiles à comprendre). Cette conversion requiert de raisonner par rapport au code en assembleur, et d'imaginer à quoi le code source pourrait ressembler, et de le réécrire en conséquence.

::: details DETAILS
Cette définition est très vague, mais durant le processus, plusieurs paramètres sont à prendre en compte:
- Le langage de programmation d'origine
- Le compilateur utilisé (version, distribution, etc.)
- Les options de compilation utilisées (optimisation, etc.)
- L'ordre d'apparition des artifacts dans le binaire (code, données, variables dans la mémoire, etc.)
:::

### 2. Une décompilation, le projet de décompiler un jeu
Une décompilation est un projet où les contributeurs *décompilent* un jeu, tout en organisation le code source, les données, et les ressources de manière à construire un projet décent. Puisque le binaire ne possède aucune référence aux noms de fonctions, de variables, de ressources, etc., une **majeure** partie des projets de décompilation consiste à nommer ces artifacts, mais aussi à remplacer les nombres magiques (des adresses, des valeurs, etc.) par des constantes, et plusieurs autres tâches du même genre, englobées dans ce qu'on appelle la "documentation". 


## IV. Ce qui différencie le source-hacking
### 1. Le source-hacking et la décompilation
La décompilation est un processus dont le but est de reconstruire le code source d'un programme, avec contrainte de correspondance avec le binaire d'origine. Le source-hacking, quant à lui, est le processus de modification du code source (obtenu à partir d'une décompilation), pour créer une rom-hack.
::: warning ATTENTION
Les termes sont souvent confondus, mais ils ne sont pas interchangeables. Se lancer dans la réalisation d'une rom-hack (en utilisant `pokeemeraude`, par exemple) **N'EST PAS** l'action de "décompiler" Pokémon Emeraude, c'est de *hacker* Pokémon Emeraude par la méthode du source-hacking (le code source étant `pokeemeraude`).
:::

### 2. Le source-hacking et le hacking binaire
Pour éviter de tergiverser, je vais prendre une allégorie que j'ai vue passer sur un serveur Discord:
- Le hacking binaire, c'est comme prendre un gateau déjà fait, et d'en changer les décorations, ou d'en ajouter des ingrédients (comme de la crème, du chocolat, etc.)<sup>3</sup>.
- Le source-hacking, c'est comme prendre la recette du gateau, de la modifier à volonté, et de faire le gateau à partir de cette recette modifiée.

Dans notre cas, le "faiseur de gateau" est le *compilateur*, qui prend la recette (le code source), et qui fait le gateau (le binaire).

### 3. Le source-hacking et les injections de code `C`
Les injections de code `C` sont une technique de **hacking binaire**, qui consiste à compiler du code `C`, et à injecter le binaire résultant dans une ROM donnée. Ce processus est plus "rapide" que le source-hacking, parce que c'est généralement un environnement plus facile à mettre en place. Cependant, il est aussi beaucoup plus limité, parce que le code injecté doit être "compatible"<sup>4</sup> avec le binaire, il doit être inséré dans un espace libre, etc. Ce genre de problèmes n'existe pas en source-hacking, parce que tout le code source est compilé de la même manière, et la notion d'espace libre est prise en charge par le *linker*<sup>5</sup>.

::: warning ATTENTION
- Les injections de code `C` ne sont **PAS** du source-hacking.
- La `CFRU` (Complete Fire Red Upgrade), et la `DPE` (Dynamic Pokemon Expansion), sont des injections de code `C`, et ne sont effectivement **PAS** des projets de source-hacking.
:::

## V. Pourquoi faire du source-hacking ?
Nous arrivons *enfin* dans le vif du sujet, pourquoi faire du source-hacking ? Cette comparaison, quoique générale, est *plus* focalisée vers ceux qui s'y connaissent déjà un peu en hacking binaire. Bien sûr, je n'écarte pas la possibilité que des gens qui se lancent dans la scène passent directement par le source-hacking, et c'est même beaucoup mieux.

### 1. La notion d'*offsets* n'existe pratiquement pas
Sauf si vous *y* tenez vraiment, et que vous faites *en sorte* d'utiliser des offsets.
Tout est question de symboles: les noms des fonctions, les noms des variables, les *constantes*, les *scripts*, etc.

### 2. La notion d'espace libre n'existe pas
Vous n'aurez *jamais* à vous soucier d'où insérer votre code, ou votre nouvelle map, ou votre nouveau sprite, etc. Le *linker* se chargera de **tout pour vous**. La seule contrainte à respecter est la taille de la mémoire correspondante<sup>6</sup> (la *RAM*, la *ROM*, etc...).

### 3. Vous pouvez déboguer votre code, avec de *vrais* outils de débogage
Il est possible d'utiliser `GDB` pour exécuter votre code *ligne par *ligne*, de vérifier les valeurs des variables, etc. 
Il est aussi possible de juste utiliser une alternative à `printf`<sup>7</sup>, pour afficher des messages dans la console (`mGBA`, `NO$GBA`, etc.).

### 4. Vous avez accès à un VCS (Version Control System) (`git`)
Sûrement le plus gros avantage: fini les backups toutes les 5 minutes, fini les corruptions de ROM aléatoires, fini les envois de patch par message privé pour collaborer avec d'autres personnes, etc. 
Avec `git`, vous pouvez effectuer des commits réguliers (des "checkpoints"), à chaque changement que vous effectuez, et si jamais vous faites une erreur, ou que votre ROM se corrompt, vous pouvez simplement revenir à un commit précédent (charger un "checkpoint"), et de continuer à partir de là. 
Vous pouvez aussi envoyer votre dépôt `git` sur une plateforme comme `GitHub` ou `GitLab`, où vous pouvez collaborer avec d'autres personnes (ceux du même projet, par exemple, ou juste des gens qui veulent vous aider pour une tâche spécifique).

::: tip CONSEIL
Pour localiser une erreur avec `git`, vous pouvez faire un `git bisect`, qui vous demandera le commit où le bug n'était pas encore présent (le commit "bon"), et le commit où vous avez commencé à voir le bug (le commit "mauvais"). Ensuite, `git` va automatiquement effectuer une recherche intéractive, et vous demandera consécutivement de vérifier le commit qu'il propose, et de lui dire si le commit est "bon" ou "mauvais". Après quelques itérations, `git` vous donnera le commit **exact** où le bug a été introduit, et vous pourrez ensuite agir en conséquence (corriger le bug, ou faire un `git revert` du commit, etc.).
:::

::: warning ATTENTION
- `git` peut être utilisé entièrement en local, il n'est pas nécessaire de créer un dépôt sur `GitHub`, `GitLab`, etc. pour en profiter.
- `GitHub`, `GitLab`, etc. sont des plateformes d'hébergement de dépôts `git`, et elles permettent de collaborer avec d'autres personnes, de stocker votre projet en ligne, etc. Mais elles sont **complètement optionnelles**.
- `git` est techniquement *aussi optionnel*, mais il est **FORTEMENT** recommandé de l'utiliser pour votre projet.
:::

### 5. Vous n'êtes plus limités par les nombres magiques
Pour étendre les Pokémon, par exemple, il est nécessaire en hacking binaire de remplacer les offsets de la RAM, de mettre à jour les références, de modifier les séquences d'octets qui correspondent à des limiteurs<sup>8</sup>, etc.
En source-hacking, il suffit d'ajouter une nouvelle constante, de définir les nouvelles données concernant les nouveaux Pokémon, et d'incrémenter<sup>9</sup> la constante qui correspond au nombre de Pokémon. Et voilà! Vous avez ajouté un nouveau Pokémon!

### 6. Vous avez le code *juste* devant vous! 
Vous n'avez qu'à résonner par rapport au code pour savoir ce qu'il fait, et dans la plupart des cas, quelqu'un a *déjà fait* ce travail pour vous. Que ce soit pour les petites modifications dans le moteur ([le Split Physique/Spécial, par exemple](https://github.com/pret/pokeemerald/wiki/add-physical-special-split)), ou pour les grosses modificatons (comme [la compatibilité entre les saves, peu importe les changements par version](https://github.com/pret/pokeemerald/wiki/How-to-Support-Savefile-Backwards-Compatibility)), vous n'avez qu'à écrire du `C`, qui est beaucoup plus plaisant que l'assembleur.

### 7. C'est pratiquement le même code, partout!
`pokeemeraude`, `pokerougefeu`, et leurs alternatives américaines, utilisent toutes le même moteur, alors un tutoriel pour Emeraude marcherait dans 80%<sup>10</sup> des cas sur Rouge Feu, et vice-versa! Les problèmes d'offsets qui ne correspondent pas sont *une histoire du passé*, **vous n'avez pas à vous en soucier**.

### 8. Des outils extrêmement efficaces
- Pour modifier les maps, on a [`porymap`](https://github.com/huderlem/porymap), qui est *considérablement* supérieur à `Advance Map 1.92/1.95`. L'éditeur de maps de `HMA` ne fonctionnant pas correctement avec les versions Françaises, `porymap` a un *net* avantage sur ce dernier, et n'est limité que *par la configuration de votre projet* (Triple-couche de metatiles<sup>11</sup>, `+2000` metatiles<sup>12</sup>, etc.). 
- Pour compiler les scripts, il y a [`poryscript`](https://github.com/huderlem/poryscript), qui permet d'avoir une *très plaisante abstraction* au dessus du langage de scripting (très proche du `C`), avec de très intéressantes fonctionnalités (formattage automatique du texte, multiplication de mouvements (`move_down * 4`), etc.)
- Pour faire des tilesets, vous n'avez plus à vous casser la tête à dessiner manuellement les blocs dans l'éditeur de tilesets de `porymap`, vous pouvez utiliser [`porytiles`](https://github.com/grunt-lucas/porytiles), où vous *compilez* un tileset en tiles, palettes, **ET** animations. Le logiciel fait tout pour vous en matière de tilesets. 
- Pour la manipulation audio des fichiers `.mid`, on a [`poryaaaa`](https://github.com/huderlem/poryaaaa), qui est aussi distribué en tant que plugin `CLAP`.
- Comme les ressources graphiques sont exposées en format `PNG`, vous pouvez utiliser votre éditeur d'image préféré directement (`Aseprite`, `PhotoShop`, etc.) tant qu'il supporte l'indexation des couleurs.

::: danger ATTENTION
Je recommande vivement de **NE PAS** utiliser `Paint`, peu importe la version.
:::

### 9. Vous pouvez *supprimer* ce dont vous n'avez pas besoin
Si vous voulez supprimer des dresseurs, des objets, des Pokémon, des maps, ou tout ce qui vous vient en tête, vous pouvez le faire *concrètement*, et la taille de votre ROM diminuera *effectivement*. Si vous voulez une base complètement pristine, c'est à partir du source-hacking que vous y arriverez.

::: danger ATTENTION
La suppression des maps est toutefois déconseillée, parce que les constantes des maps sont réferencées un peu partout. Si cela vous enchante de régler toutes les erreurs de compilation quand une map est supprimée, alors ignorez cet avertissement, dans le cas contraire, il est préférable de grouper toutes les maps dont vous n'avez pas besoin dans un `MapGroup` spécifique, et de ne juste *jamais plus* y toucher.
:::


### 10. *Tous* les systèmes d'exploitation sont supportés
Pour le hacking binaire, `HMA` est devenu l'un des outils standards *à utiliser*, cependant, `HMA` n'est **disponible que sur Windows**. Cette exclusivité limite grandement les utilisateurs d'autres OS<sup>13</sup>, et les force à soit:
- Trouver un PC avec *Windows 10*, et l'utiliser pour du Rom-Hacking.
- Utiliser une machine virtuelle de *Windows 10*, et y faire du Rom-Hacking.

Ces contraintes sont extrêmement ennuyantes, mais elles ne *sont pas présentes* dans le source-hacking. Il y a des tutoriels dédiés pour chaque OS (Rien que l'installation, parce que c'est ce qui diffère entre OS), et *tous* les outils sont open-source (et codés dans des langages *multi-plateforme*), ce qui permet de les compiler vous-même si jamais vous utilisez un OS obscur.

Je pense avoir fait le tour de tout ce qui me venait en tête, cependant, gardez à l'esprit qu'il y a sûrement bien plus d'avantages que je n'ai mentionnés. Le seul réel inconvénient avec le source-hacking est la mise en place de l'environnement, passé cette étape, et vous ne reviendrez *très probablement* plus en arrière.

## VI. Notes
::: tip CONSEIL
Presque toutes les ressources (jusqu'ici) pour le source-hacking sont en Anglais, mais elles sont tout de même compréhensibles.

Une des ressources les plus utiles est le Wiki, où vous avez une pléthorée de tutoriels:
- [Wiki `pokeemerald`](https://github.com/pret/pokeemerald/wiki/)
- [Wiki `pokefirered`](https://github.com/pret/pokefirered/wiki/)
:::

::: tip CONSEIL
Même si, comme pour la connaissance du langage `C`, la familiarité avec les concepts de la `GBA` n'est pas *nécessairement* requise, elle représente quand même un avantage. Il existe plusieurs resources pour apprendre les concepts de la `GBA`:
- [GBATEK](https://problemkaputt.de/gbatek.htm) (en Anglais)
- [GBAdev](https://gbadev.net/) (en Anglais)
:::

| Note | Explication |
| --- | --- |
| 1 | Les scripts de `XSE` n'ont pas de syntaxe assez abstraite pour permettre un branchement `if` comme en `C`, et sont effectivement plus lents parce qu'ils sont interprétés *par le moteur du jeu lui-même.*|
| 2 | Plusieurs outils, comme `Ghidra`, `IDA Pro`, etc. peuvent accélerer le processus en fournissant une ébauche, mais il est souvent nécessaire de réécrire une grande partie du code pour "correspondre" au binaire. |
| 3 | Le hacking binaire peut techniquement aussi modifier sa recette, mais cela se fait à partir des injections (de code `C`), mais à ce stade, il est beaucoup plus simple et intuitif de faire du source-hacking. |
| 4 | On parle ici d'`ABI` (Application Binary Interface), si la configuration du compilateur n'est pas compatible avec celle utilisée pour compiler le binaire, le code ne fonctionnera **PAS**, parce que les conventions (appels de fonctions, passage d'arguments, etc.) ne sont pas équivalentes. |
| 5 | Le *linker* est le programme qui se charge de répartir les artifacts (code, données, ressources, etc.) dans la ROM, et de vérifier les références (les *symboles*). |
| 6 | Les données constantes (les sprites, les maps, les musiques, etc.), ainsi que les fonctions, sont stockées dans la ROM. Les variables, et les fonctions *explicitement marquées* sont stockées dans la RAM (l'`IWRAM` (Internal Working RAM), ou l'`EWRAM` (External Working RAM))|
| 7 | `printf` est une fonction standard du langage `C`, elle permet d'afficher un message, et *optionnellement* des variables, dans la console. |
| 8 | Les limiteurs sont en fait des constantes compilées dans le binaire, mais comme le binaire ne stocke pas de noms, ils correspondent juste à une séquence d'octets. |
| 9 | "Incrémenter" signifie d'augmenter une valeur, généralement de 1 (`n = n + 1`). Le contraire, "décrémenter", signifie de diminuer une valeur. |
| 10 | Les 20% restants viennent du fait qu'il faut quand même effectuer des changement préliminaires, qui dépendent du code à modifier. |
| 11 | Ceux familiers avec le hacking binaire sont sûrement plus habitués au terme "bloc", mais dans tout le code, ce sont des "metatiles", et non des blocs. |
| 12 | Pour référence, le nombre maximum de metatiles (Tileset 1 + 2) pour Emeraude est de `1024`. |
| 13 | OS (Operating System) est l'Anglais pour "Système d'Exploitation". |