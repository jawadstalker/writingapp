import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, PenTool, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl border-x border-gray-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};
