import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Monitor, 
  ClipboardList, 
  HardDrive, 
  History, 
  FileBarChart, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { Role, Language, View } from '../types';
import { getTexts } from '../utils/translations';

interface SidebarProps {
  isOpen: boolean;
  userRole: Role;
  language: Language;
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isOpen: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, isOpen, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    {icon}
    {isOpen && <span className="font-medium whitespace-nowrap">{label}</span>}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, userRole, language, currentView, onNavigate, onLogout }) => {
  const t = getTexts(language);

  // Define menu items with required permissions (roles)
  const menuItems: { id: View, icon: React.ReactNode, label: string, roles: Role[] }[] = [
    { id: 'DASHBOARD', icon: <LayoutDashboard size={20} />, label: t.navHome, roles: ['ADMIN', 'TECHNICIAN', 'USER'] },
    { id: 'CLIENTS', icon: <Users size={20} />, label: t.navClients, roles: ['ADMIN', 'TECHNICIAN'] },
    { id: 'EQUIPMENT', icon: <Monitor size={20} />, label: t.navEquipment, roles: ['ADMIN', 'TECHNICIAN'] },
    { id: 'ORDERS', icon: <ClipboardList size={20} />, label: t.navOrders, roles: ['ADMIN', 'TECHNICIAN', 'USER'] },
    { id: 'PARTS', icon: <HardDrive size={20} />, label: t.navParts, roles: ['ADMIN', 'TECHNICIAN'] },
    { id: 'AUDIT', icon: <ShieldCheck size={20} />, label: t.navAudit, roles: ['ADMIN'] }, // Audit to all screens (available in menu)
  ];

  return (
    <aside 
      className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} shadow-2xl z-20`}
    >
      <div className="h-20 flex items-center justify-center border-b border-slate-800 px-4 overflow-hidden">
        {isOpen ? (
          <h1 className="text-xl font-bold tracking-wider text-blue-400 whitespace-nowrap">NeoCircuit Lab</h1>
        ) : (
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold">NL</div>
        )}
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          // Check if user role is allowed for this item
          if (item.roles.includes(userRole)) {
            return (
              <NavItem 
                key={item.id}
                icon={item.icon} 
                label={item.label} 
                active={currentView === item.id} 
                isOpen={isOpen} 
                onClick={() => onNavigate(item.id)}
              />
            );
          }
          return null;
        })}

        <div className="border-t border-slate-800 my-2 pt-2">
            {/* History and Reports separate section */}
            {['ADMIN', 'TECHNICIAN'].includes(userRole) && (
                 <NavItem icon={<History size={20} />} label={t.navHistory} isOpen={isOpen} active={currentView === 'HISTORY'} onClick={() => onNavigate('HISTORY')} />
            )}
             {userRole === 'ADMIN' && (
                 <NavItem icon={<FileBarChart size={20} />} label={t.navReports} isOpen={isOpen} active={currentView === 'REPORTS'} onClick={() => onNavigate('REPORTS')} />
            )}
        </div>

        {/* Settings - Only for Admin */}
        {userRole === 'ADMIN' && (
          <div className="border-t border-slate-800 my-2 pt-2">
            <NavItem icon={<Settings size={20} />} label={t.navSettings} isOpen={isOpen} active={currentView === 'SETTINGS'} onClick={() => onNavigate('SETTINGS')} />
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
         <button 
           onClick={onLogout}
           className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full p-2"
         >
           <LogOut size={20} />
           {isOpen && <span>{t.logout}</span>}
         </button>
      </div>
    </aside>
  );
};