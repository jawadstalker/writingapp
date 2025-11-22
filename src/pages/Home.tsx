import React from 'react';
import { useStories } from '../context/StoryContext';
import { Link } from 'react-router-dom';
import { Plus, Book, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const Home: React.FC = () => {
  const { stories } = useStories();

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Stories</h1>
        <p className="text-gray-500 mt-1">Keep your imagination flowing</p>
      </div>

      <div className="px-4 space-y-4">
        {stories.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No stories yet</h3>
            <p className="text-gray-500 mt-1 max-w-xs mx-auto">Create your first masterpiece by tapping the button below.</p>
          </div>
        ) : (
          stories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex h-32">
                <div className="w-24 h-full bg-gray-200 flex-shrink-0 relative">
                  {story.coverImage ? (
                    <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500">
                      <Book className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="font-bold text-gray-900 truncate text-lg">{story.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {story.genres.slice(0, 2).map((g) => (
                        <span key={g} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {g}
                        </span>
                      ))}
                      {story.genres.length > 2 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          +{story.genres.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(story.lastUpdated), 'MMM d')}
                    </span>
                    <span>{story.chapters.length} Chapters</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <Link
        to="/create"
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="w-8 h-8" />
      </Link>
    </div>
  );
};
