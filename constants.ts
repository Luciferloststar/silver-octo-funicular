import { ContentItem, ContentType, User, Comment } from './types';

export const SAGAR_SAHU_ADMIN: User = {
  id: 'sagar_admin',
  email: 'sagar@sahu.com',
  notificationEmail: 'notifications@sagar.com',
  username: 'Sagar Sahu',
  avatar: 'https://i.pravatar.cc/150?u=sagar-admin'
};

export const MOCK_STORIES: ContentItem[] = [
  {
    id: 'story-1',
    type: ContentType.Story,
    title: 'The Crimson Cipher',
    tagline: 'In a city of code, one secret can rewrite reality.',
    description: 'A rogue AI programmer stumbles upon a quantum cipher that could dismantle the world\'s digital infrastructure. He must outrun a shadowy corporation to expose the truth.',
    coverImage: 'https://picsum.photos/seed/crimsoncipher/800/1200',
    tags: ['Cyberpunk', 'Thriller', 'Sci-Fi'],
  },
  {
    id: 'story-2',
    type: ContentType.Story,
    title: 'Echoes of a Forgotten Star',
    description: 'An archaeologist discovers an ancient alien artifact that broadcasts the last memories of a dead civilization, leading her on a perilous journey across the galaxy.',
    coverImage: 'https://picsum.photos/seed/echostar/800/1200',
    tags: ['Space Opera', 'Adventure'],
  },
  {
    id: 'story-3',
    type: ContentType.Story,
    title: 'The Gilded Cage',
    description: 'In a Victorian-era city powered by forbidden alchemy, a young woman with a mysterious past must navigate a web of political intrigue to reclaim her destiny.',
    coverImage: 'https://picsum.photos/seed/gildedcage/800/1200',
    tags: ['Steampunk', 'Fantasy', 'Mystery'],
  },
];

export const MOCK_DOCS: ContentItem[] = [
  {
    id: 'doc-1',
    type: ContentType.Documentary,
    title: 'Architects of the Digital Age',
    description: 'An in-depth look at the pioneers of the early internet and the utopian ideals that shaped the web we know today.',
    coverImage: 'https://picsum.photos/seed/digitalage/800/600',
    tags: ['Technology', 'History', 'Internet'],
  },
  {
    id: 'doc-2',
    type: ContentType.Documentary,
    title: 'Into the Abyss: Deep Sea Exploration',
    description: 'Journey with leading oceanographers as they explore the deepest, most mysterious parts of our planet\'s oceans and the bizarre lifeforms that inhabit them.',
    coverImage: 'https://picsum.photos/seed/deepsea/800/600',
    tags: ['Nature', 'Science', 'Exploration'],
  },
];

export const MOCK_ARTICLES: ContentItem[] = [
  {
    id: 'article-1',
    type: ContentType.Article,
    title: 'The Philosophy of World-Building',
    description: 'A deep dive into the art of creating believable and immersive fictional worlds, from crafting mythologies to designing ecosystems.',
    coverImage: 'https://picsum.photos/seed/worldbuilding/800/500',
    tags: ['Writing', 'Creativity', 'Fantasy'],
  },
  {
    id: 'article-2',
    type: ContentType.Article,
    title: 'Cybernetics and Storytelling',
    description: 'Exploring how concepts from cybernetics and systems theory can be used to create complex and dynamic narratives.',
    coverImage: 'https://picsum.photos/seed/cybernetics/800/500',
    tags: ['Technology', 'Narrative Theory'],
  },
  {
    id: 'article-3',
    type: ContentType.Article,
    title: 'The Resurgence of Noir in Modern Cinema',
    description: 'An analysis of neo-noir trends and why the genre\'s cynical, stylish themes continue to resonate with contemporary audiences.',
    coverImage: 'https://picsum.photos/seed/noircinema/800/500',
    tags: ['Film', 'Culture', 'Analysis'],
  },
];

export const MOCK_SLIDES: ContentItem[] = [
  MOCK_STORIES[0],
  {
    id: 'story-4',
    type: ContentType.Story,
    title: 'Neon Requiem',
    tagline: 'Where chrome meets soul.',
    description: 'A bio-engineered detective hunts a killer who can manipulate memories in a rain-drenched, neon-lit metropolis of 2099.',
    coverImage: 'https://picsum.photos/seed/neonrequiem/1920/1080',
    tags: ['Cyberpunk', 'Noir', 'Sci-Fi'],
  },
  MOCK_DOCS[1],
];


export const MOCK_USERS: User[] = [
  { id: 'user-1', email: 'reader1@example.com', username: 'CyberReader', avatar: 'https://i.pravatar.cc/150?u=user1', notificationEmail: 'reader1@example.com' },
  { id: 'user-2', email: 'fan2@example.com', username: 'StarGazer', avatar: 'https://i.pravatar.cc/150?u=user2', notificationEmail: 'fan2@example.com' },
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'comment-1', user: MOCK_USERS[0], text: 'The Crimson Cipher had me on the edge of my seat! The ending was a masterpiece of suspense.', timestamp: '2 hours ago' },
  { id: 'comment-2', user: MOCK_USERS[1], text: 'I really hope there\'s a sequel to Echoes of a Forgotten Star. The world-building is incredible.', timestamp: '5 hours ago' },
];