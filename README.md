# OnePlayer

## Description

OnePlayer est une application SPA (Single Page Application) pour la lecture de fichiers vidéo à l'aide du lecteur RxPlayer.

## Description de l'interface et des fonctionnalités

La page principale comprend trois composants :

- VideoPreview: Ce composant est conçu pour lire un extrait vidéo, afficher une description et proposer les boutons "Voir la vidéo", "Plus d'info" et "Contrôle du son (Mute control)".
- VideoGallery: Ce composant affiche sous forme de liste toutes les vidéos disponibles (actuellement représentées sous forme de mock-objet dans le fichier /data/mockData.ts).

  ![VideoPreview + VideoGallery](/src/assets/screenshot-2.jpeg)

- VideoPlayer: Il s'agit du composant principal de l'application, qui fonctionne comme un lecteur vidéo avec les éléments de contrôle suivants : lecture/pause, avance rapide de 10 secondes, retour en arrière de 10 secondes, barre de progression, réglage du volume et bouton d'affichage des scènes clés.

  ![VideoPlayer](/src/assets/screenshot-2.jpeg)

  Pour traiter les requêtes API, une classe ApiServices est utilisée, avec les méthodes getScenes et getCrew. Pour la gestion des erreurs et le chargement des données, un hook personnalisé useFetch est employé.\
  \
  Puisque l'API ne fournit pas toutes les données, un mock-objet a été créé pour démontrer l'application avec des données de test (fichier /data/mockData.ts). Cet objet contient des informations telles que le titre, la description, etc. Les attributs scenesApi et crewApi permettent de travailler avec ApiServices pour récupérer des données depuis l'API.\
  \
  Voici quelques exemples de données de test :

```
[
  {
    id: 1,
    title: 'Big Buck Bunny',
    description: "Dans un monde coloré, tout va pour le mieux : un gros lapin se réveille et sort de sa tanière. Il respire à pleins poumons les essences du printemps et admire les papillons. Seulement, c'est sans compter la méchanceté de trois rongeurs (Frank, Rinky et Gamera) qui tuent un de ces papillons sous les yeux abasourdis du lapin. Celui-ci décide alors de se venger. Après une longue préparation de divers pièges, les trois mammifères vont respectivement se faire faucher par un tronc en balancement, se faire catapulter et finir en cerf-volant.",
    logo: logo__Big_Buck_Bunny,
    poster: poster__Big_Buck_Bunny,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    beginTimecode: 244,
    endTimecode: 264,
    scenesApi: 'https://teamplayer.ddns.net:9094/scenes',
    crewApi: 'https://teamplayer.ddns.net:9094/crew'
  },
  {
    id: 2,
    title: 'Elephants Dream',
    description: "Elephants Dream est une courte histoire mettant en scène deux personnages, Emo et Proog, dans un monde modelé par les pensées des deux personnages. Proog, l'aîné, est émerveillé par ce monde et ses mystères ; Emo, de son côté, est lassé de son environnement.",
    poster: poster__Elephants_Dream,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    beginTimecode: 254,
    endTimecode: 274,
  },
]
```

## Installation

Clone repo:

```
git clone https://github.com/GregoryTishchenko/oneplayer.git
```

Naviguer dans le répertoire du projet:

```
cd oneplayer
```

Installer les dépendances avec npm:

```
npm install
```

Lancer l'application en mode développement

```
npm run dev
```

Lance l'application en mode développement.\
Ouvrez [http://localhost:5173/](http://localhost:5173/) pour la visualiser dans votre navigateur.

## Technologies utilisées

React - 18\
Axios - 1.7.2\
RxPlayer - 4.1.0\
Sass - 1.77.8\
Vite - 5.3.4
