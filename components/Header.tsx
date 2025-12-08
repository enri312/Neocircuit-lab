import React from 'react';
import { Menu, Search, Bell, Cpu } from 'lucide-react';
import { User, Language } from '../types';
import { getTexts } from '../utils/translations';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  user: User | null;
  language: Language;
}

export const Header: React.FC<HeaderProps> = ({ 
  sidebarOpen, 
  onToggleSidebar, 
  user,
  language
}) => {
  const t = getTexts(language);

  const getRoleLabel = (role?: string) => {
    switch(role) {
      case 'ADMIN': return t.roleAdmin;
      case 'TECHNICIAN': return t.roleTech;
      case 'USER': return t.roleUser;
      default: return '';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
          <Menu size={20} />
        </button>
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 leading-tight">NeoCircuit Lab</h2>
            <span className="text-xs text-green-600 font-medium">{t.systemActive}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
          />
        </div>
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{getRoleLabel(user?.role)}</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-cyan-400"></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};