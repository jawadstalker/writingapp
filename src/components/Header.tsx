import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  actions?: React.ReactNode;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, actions, transparent }) => {
  const navigate = useNavigate();

  return (
    <header className={`flex items-center justify-between px-4 py-3 z-10 ${transparent ? 'absolute top-0 left-0 right-0 bg-transparent text-white' : 'bg-white border-b border-gray-100 text-gray-900'}`}>
      <div className="flex items-center gap-2">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full ${transparent ? 'bg-black/20 backdrop-blur-sm hover:bg-black/30' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {title && <h1 className="font-semibold text-lg truncate max-w-[200px]">{title}</h1>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
      </div>
    </header>
  );
};
