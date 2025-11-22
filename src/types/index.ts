export interface Chapter {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export interface Story {
  id: string;
  title: string;
  coverImage?: string;
  genres: string[];
  tags: string[];
  chapters: Chapter[];
  createdAt: string;
  lastUpdated: string;
}

export type Genre = 'Fantasy' | 'Sci-Fi' | 'Romance' | 'Mystery' | 'Thriller' | 'Horror' | 'Historical' | 'Non-Fiction';

export const AVAILABLE_GENRES: Genre[] = [
  'Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Thriller', 'Horror', 'Historical', 'Non-Fiction'
];
