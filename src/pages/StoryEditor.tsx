import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStories } from '../context/StoryContext';
import { AVAILABLE_GENRES, Genre } from '../types';
import { Header } from '../components/Header';
import { Camera, X, Plus, Save, Trash2 } from 'lucide-react';

export const StoryEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stories, addStory, updateStory, deleteStory } = useStories();
  const existingStory = stories.find((s) => s.id === id);
  const isEditing = !!existingStory;

  const [title, setTitle] = useState(existingStory?.title || '');
  const [coverImage, setCoverImage] = useState(existingStory?.coverImage || '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(existingStory?.genres || []);
  const [tags, setTags] = useState<string[]>(existingStory?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGenre = (genre: Genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (isEditing && id) {
      updateStory(id, {
        title,
        coverImage,
        genres: selectedGenres,
        tags,
      });
      navigate(`/story/${id}`);
    } else {
      addStory({
        title,
        coverImage,
        genres: selectedGenres,
        tags,
      });
      navigate('/');
    }
  };

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this story? This cannot be undone.')) {
      deleteStory(id);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header 
        showBack 
        title={isEditing ? 'Edit Story' : 'New Story'} 
        actions={
          <div className="flex gap-2">
            {isEditing && (
              <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={handleSave} 
              disabled={!title.trim()}
              className="text-indigo-600 font-medium px-2 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        }
      />

      <div className="p-4 space-y-6">
        {/* Cover Image */}
        <div 
          className="w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden relative group cursor-pointer border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {coverImage ? (
            <>
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium flex items-center gap-2">
                  <Camera className="w-5 h-5" /> Change Cover
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-sm">Add Cover Image</span>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg font-medium"
          />
        </div>

        {/* Genres */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedGenres.includes(genre)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                #{tag}
                <button onClick={() => removeTag(tag)} className="hover:text-indigo-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Type tag and press Enter..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};
