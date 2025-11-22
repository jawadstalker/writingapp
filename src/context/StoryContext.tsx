import React, { createContext, useContext, useState, useEffect } from 'react';
import { Story, Chapter } from '../types';
import { generateId } from '../lib/utils';

interface StoryContextType {
  stories: Story[];
  addStory: (story: Omit<Story, 'id' | 'createdAt' | 'lastUpdated' | 'chapters'>) => void;
  updateStory: (id: string, updates: Partial<Story>) => void;
  deleteStory: (id: string) => void;
  getStory: (id: string) => Story | undefined;
  addChapter: (storyId: string, chapter: Omit<Chapter, 'id' | 'lastUpdated'>) => void;
  updateChapter: (storyId: string, chapterId: string, updates: Partial<Chapter>) => void;
  deleteChapter: (storyId: string, chapterId: string) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('writer-app-stories');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('writer-app-stories', JSON.stringify(stories));
  }, [stories]);

  const addStory = (storyData: Omit<Story, 'id' | 'createdAt' | 'lastUpdated' | 'chapters'>) => {
    const newStory: Story = {
      ...storyData,
      id: generateId(),
      chapters: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    setStories((prev) => [newStory, ...prev]);
  };

  const updateStory = (id: string, updates: Partial<Story>) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id ? { ...story, ...updates, lastUpdated: new Date().toISOString() } : story
      )
    );
  };

  const deleteStory = (id: string) => {
    setStories((prev) => prev.filter((story) => story.id !== id));
  };

  const getStory = (id: string) => stories.find((s) => s.id === id);

  const addChapter = (storyId: string, chapterData: Omit<Chapter, 'id' | 'lastUpdated'>) => {
    const newChapter: Chapter = {
      ...chapterData,
      id: generateId(),
      lastUpdated: new Date().toISOString(),
    };
    
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              chapters: [...story.chapters, newChapter],
              lastUpdated: new Date().toISOString(),
            }
          : story
      )
    );
  };

  const updateChapter = (storyId: string, chapterId: string, updates: Partial<Chapter>) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              chapters: story.chapters.map((ch) =>
                ch.id === chapterId ? { ...ch, ...updates, lastUpdated: new Date().toISOString() } : ch
              ),
              lastUpdated: new Date().toISOString(),
            }
          : story
      )
    );
  };

  const deleteChapter = (storyId: string, chapterId: string) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              chapters: story.chapters.filter((ch) => ch.id !== chapterId),
              lastUpdated: new Date().toISOString(),
            }
          : story
      )
    );
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        addStory,
        updateStory,
        deleteStory,
        getStory,
        addChapter,
        updateChapter,
        deleteChapter,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStories = () => {
  const context = useContext(StoryContext);
  if (!context) throw new Error('useStories must be used within a StoryProvider');
  return context;
};
