import React, { useState } from 'react';
import { User, Role, Language } from '../types';
import { getTexts } from '../utils/translations';
import { Wrench, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, language, setLanguage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = getTexts(language);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      let role: Role = 'USER';
      let name = 'Usuario Demo';
      
      // Mock logic for demo purposes - simple includes check
      // In a real app, this would be validated against a backend
      if (email.toLowerCase().includes('admin')) {
        role = 'ADMIN';
        name = 'Admin Principal';
      } else if (email.toLowerCase().includes('tech')) {
        role = 'TECHNICIAN';
        name = 'Técnico';
      }

      const user: User = {
        id: 'u-1',
        name: name,
        email: email,
        role: role,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0D8ABC&color=fff`
      };

      onLogin(user);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Wrench className="w-6 h-6" />
            </div>
            
            {/* Language Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${language === 'es' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                ES
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                EN
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.loginTitle}</h1>
          <p className="text-gray-500 mb-8">{t.loginSubtitle}</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.userLabel}
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder=""
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none pr-12"
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:translate-y-[-1px] active:translate-y-[0px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                t.loginButton
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};