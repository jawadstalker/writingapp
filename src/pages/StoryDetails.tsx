import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStories } from '../context/StoryContext';
import { Header } from '../components/Header';
import { Edit2, Plus, Clock, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const StoryDetails: React.FC = () => {
  const { id } = useParams();
  const { getStory } = useStories();
  const story = getStory(id || '');
  const navigate = useNavigate();

  if (!story) return <div className="p-8 text-center">Story not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 bg-gray-900">
        {story.coverImage && (
          <img 
            src={story.coverImage} 
            alt={story.title} 
            className="w-full h-full object-cover opacity-60" 
          />
        )}
        <Header 
          transparent 
          showBack 
          actions={
            <Link to={`/edit/${story.id}`} className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30">
              <Edit2 className="w-5 h-5" />
            </Link>
          } 
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h1 className="text-3xl font-bold text-white mb-2">{story.title}</h1>
          <div className="flex flex-wrap gap-2">
            {story.genres.map(g => (
              <span key={g} className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-md">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Chapters</h2>
          <button 
            onClick={() => navigate(`/story/${story.id}/chapter/new`)}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" /> New Chapter
          </button>
        </div>

        <div className="space-y-3">
          {story.chapters.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">No chapters yet. Start writing!</p>
            </div>
          ) : (
            story.chapters.map((chapter, index) => (
              <Link
                key={chapter.id}
                to={`/story/${story.id}/chapter/${chapter.id}`}
                className="block bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{chapter.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {chapter.content.substring(0, 50) || "No content..."}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(new Date(chapter.lastUpdated), { addSuffix: true })}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
        
        {story.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <span key={tag} className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
