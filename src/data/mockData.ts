import logo__Big_Buck_Bunny from '../assets/Big_Buck_Bunny.svg';
import poster__Big_Buck_Bunny from '../assets/Big_buck_bunny_poster.jpg';
import poster__Elephants_Dream from '../assets/Elephants_Dream_poster.png';
import poster__Sintel from '../assets/Sintel_poster.jpg';
import logo__Sintel from '../assets/Sintel.png';
import logo__Tos from '../assets/Tos.png';
import poster__Tos from '../assets/Tos_poster.png';


export const mockData: IVideo[] = [
  {
    id: 1,
    title: 'Big Buck Bunny',
    description: "Dans un monde coloré, tout va pour le mieux : un gros lapin se réveille et sort de sa tanière. Il respire à pleins poumons les essences du printemps et admire les papillons. Seulement, c'est sans compter la méchanceté de trois rongeurs (Frank, Rinky et Gamera) qui tuent un de ces papillons sous les yeux abasourdis du lapin. Celui-ci décide alors de se venger. Après une longue préparation de divers pièges, les trois mammifères vont respectivement se faire faucher par un tronc en balancement, se faire catapulter et finir en cerf-volant.",
    logo: logo__Big_Buck_Bunny,
    poster: poster__Big_Buck_Bunny,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    beginTimecode: 244,
    endTimecode: 264,
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
  {
    id: 3,
    title: 'Sintel',
    description: "Une jeune femme solitaire, Sintel, secourt et se lie d'amitié avec un dragonneau, qu'elle nomme Scales. Mais lorsque celui-ci se fait enlever par un dragon adulte, Sintel décide de se lancer dans une dangereuse quête pour retrouver son compagnon.",
    logo: logo__Sintel,
    poster: poster__Sintel,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    beginTimecode: 35,
    endTimecode: 65,
  },
  {
    id: 4,
    title: 'Tears of Steel',
    description: "Un groupe de guerriers et de scientifiques rassemblés à la Oude Kerk essayent de revivre un événement du passé pour sauver le monde de la destruction par des robots.",
    logo: logo__Tos,
    poster: poster__Tos,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    beginTimecode: 45,
    endTimecode: 65,
  },
];