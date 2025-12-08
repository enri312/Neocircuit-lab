import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LoginScreen } from './components/LoginScreen';
import ClientList from './components/ClientList';
import { OrdersView } from './components/views/OrdersView';
import { AuditView } from './components/views/AuditView';
import { InventoryView } from './components/views/InventoryView';
import { RepairOrder, RepairStatus, User, Language, View, Client, AuditLog, Equipment } from './types';

// Mock Data
const DUMMY_REPAIRS: RepairOrder[] = [
  {
    id: 'ORD-2345',
    clientId: 'C-101',
    clientName: 'Juan Pérez',
    equipmentId: 'E-505',
    equipmentModel: 'MacBook Pro 2019',
    entryDate: '2023-10-25',
    diagnosis: 'Pantalla parpadea',
    observations: 'Golpe en esquina',
    status: RepairStatus.IN_REPAIR,
    estimatedCost: 350
  },
  {
    id: 'ORD-2346',
    clientId: 'C-102',
    clientName: 'María García',
    equipmentId: 'E-506',
    equipmentModel: 'Dell XPS 13',
    entryDate: '2023-10-26',
    diagnosis: 'Sin diagnóstico',
    observations: 'Batería hinchada visible',
    status: RepairStatus.PENDING,
    estimatedCost: 120
  },
  {
    id: 'ORD-2342',
    clientId: 'C-99',
    clientName: 'Usuario Demo',
    equipmentId: 'E-400',
    equipmentModel: 'PS5 Digital',
    entryDate: '2023-10-24',
    diagnosis: 'Puerto HDMI dañado',
    observations: 'Reemplazo de puerto',
    status: RepairStatus.READY,
    estimatedCost: 180
  },
  {
    id: 'ORD-2340',
    clientId: 'C-88',
    clientName: 'Ana Smith',
    equipmentId: 'E-332',
    equipmentModel: 'iPhone 13',
    entryDate: '2023-10-20',
    diagnosis: 'Suciedad en puerto de carga',
    observations: 'Limpieza profunda',
    status: RepairStatus.DELIVERED,
    estimatedCost: 45
  },
  {
    id: 'ORD-2344',
    clientId: 'C-105',
    clientName: 'TecnoCorp SA',
    equipmentId: 'E-510',
    equipmentModel: 'Lenovo ThinkPad',
    entryDate: '2023-10-23',
    diagnosis: 'Sistema lento',
    observations: 'Upgrade SSD + RAM',
    status: RepairStatus.DIAGNOSTIC,
    estimatedCost: 150
  },
];

// DUMMY_CLIENTS removed as we now use real API data via ClientList component

const DUMMY_EQUIPMENT: Equipment[] = [
  { id: 'E-505', brand: 'Apple', model: 'MacBook Pro 2019', type: 'Notebook', serialNumber: 'C02YW123', physicalCondition: 'Bueno, golpe en esquina' },
  { id: 'E-506', brand: 'Dell', model: 'XPS 13', type: 'Notebook', serialNumber: '8H22S1', physicalCondition: 'Regular, batería hinchada' },
  { id: 'E-400', brand: 'Sony', model: 'PlayStation 5', type: 'PC', serialNumber: 'S01-99821', physicalCondition: 'Excelente' },
  { id: 'E-332', brand: 'Apple', model: 'iPhone 13', type: 'PC', serialNumber: 'FFG221', physicalCondition: 'Rayones en pantalla' },
  { id: 'E-510', brand: 'Lenovo', model: 'ThinkPad T14', type: 'Notebook', serialNumber: 'PF-22X9', physicalCondition: 'Excelente' },
  { id: 'E-511', brand: 'HP', model: 'Pavilion 15', type: 'Notebook', serialNumber: '5CD1234', physicalCondition: 'Desgaste en teclado' },
];

const DUMMY_AUDIT: AuditLog[] = [
  { id: 'AUD-001', timestamp: '2023-10-27 09:30:15', userId: 'U-1', userName: 'Admin Principal', action: 'LOGIN', details: 'Inicio de sesión exitoso' },
  { id: 'AUD-002', timestamp: '2023-10-27 10:15:00', userId: 'U-2', userName: 'Técnico', action: 'UPDATE_ORDER', details: 'Cambio estado orden ORD-2345 a En Reparación' },
  { id: 'AUD-003', timestamp: '2023-10-27 11:05:22', userId: 'U-1', userName: 'Admin Principal', action: 'CREATE_CLIENT', details: 'Registro nuevo cliente C-106' },
  { id: 'AUD-004', timestamp: '2023-10-27 14:20:10', userId: 'U-1', userName: 'Admin Principal', action: 'EXPORT_REPORT', details: 'Exportación de reporte de ventas mensual' },
  { id: 'AUD-005', timestamp: '2023-10-27 16:45:00', userId: 'U-1', userName: 'Admin Principal', action: 'DELETE_EQUIPMENT', details: 'Eliminado equipo E-500 (Asus Rog) del inventario' },
];

const App: React.FC = () => {
  // State for Authentication
  const [user, setUser] = useState<User | null>(null);

  // State for Settings & Nav
  const [language, setLanguage] = useState<Language>('es');
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- Handlers ---
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('DASHBOARD');
    setSidebarOpen(true);
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  // --- Filtering Logic ---
  const visibleRepairs = React.useMemo(() => {
    if (!user) return [];
    if (user.role === 'USER') {
      return DUMMY_REPAIRS.filter(r => r.clientName === user.name);
    }
    return DUMMY_REPAIRS;
  }, [user]);


  // --- Render View Content ---
  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard repairs={visibleRepairs} language={language} userRole={user?.role || 'USER'} />;
      case 'CLIENTS':
        return <ClientList />;
      case 'ORDERS':
        return <OrdersView orders={visibleRepairs} language={language} />;
      case 'AUDIT':
        return <AuditView logs={DUMMY_AUDIT} language={language} />;
      case 'EQUIPMENT':
        return <InventoryView language={language} type="EQUIPMENT" equipment={DUMMY_EQUIPMENT} />;
      case 'PARTS':
        return <InventoryView language={language} type="PARTS" />;
      default:
        // Fallback for not implemented views
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Vista en construcción: {currentView}
          </div>
        );
    }
  };

  // --- Main Render ---

  if (!user) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        userRole={user.role}
        language={language}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          language={language}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;