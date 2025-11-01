
export enum ContentType {
  Story = 'STORY',
  Documentary = 'DOCUMENTARY',
  Article = 'ARTICLE',
}

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  tagline?: string;
  description: string;
  coverImage: string;
  tags: string[];
  content?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}
