import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStories } from '../context/StoryContext';
import { Header } from '../components/Header';
import { Save, Trash2, MoreVertical } from 'lucide-react';

export const ChapterEditor: React.FC = () => {
  const { storyId, chapterId } = useParams();
  const navigate = useNavigate();
  const { getStory, addChapter, updateChapter, deleteChapter } = useStories();
  
  const story = getStory(storyId || '');
  const isNew = chapterId === 'new';
  const existingChapter = story?.chapters.find(c => c.id === chapterId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (existingChapter) {
      setTitle(existingChapter.title);
      setContent(existingChapter.content);
    } else if (isNew) {
      setTitle(`Chapter ${(story?.chapters.length || 0) + 1}`);
    }
  }, [existingChapter, isNew, story]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
  }, [content]);

  const handleSave = () => {
    if (!storyId || !title.trim()) return;

    if (isNew) {
      addChapter(storyId, { title, content });
    } else if (chapterId) {
      updateChapter(storyId, chapterId, { title, content });
    }
    navigate(`/story/${storyId}`);
  };

  const handleDelete = () => {
    if (storyId && chapterId && !isNew) {
      if (window.confirm('Delete this chapter?')) {
        deleteChapter(storyId, chapterId);
        navigate(`/story/${storyId}`);
      }
    }
  };

  if (!story) return <div>Story not found</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        showBack 
        actions={
          <div className="flex items-center gap-2">
            {!isNew && (
              <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={handleSave}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full font-medium hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        }
      />

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        <div className="px-6 py-4 border-b border-gray-100">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Chapter Title"
            className="w-full text-xl font-bold text-gray-900 placeholder-gray-300 outline-none"
          />
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your story..."
          className="flex-1 w-full p-6 resize-none outline-none text-lg leading-relaxed text-gray-700 font-serif"
          spellCheck={false}
        />
        
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
          <span>{wordCount} words</span>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};
