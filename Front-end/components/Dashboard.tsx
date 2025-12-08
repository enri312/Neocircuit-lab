import React from 'react';
import { 
  Wrench, 
  Users, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { RepairList } from './RepairList';
import { RepairOrder, RepairStatus, Language, Role } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getTexts } from '../utils/translations';

interface DashboardProps {
  repairs: RepairOrder[];
  language: Language;
  userRole: Role;
}

const CHART_DATA = [
  { name: 'Lun', orders: 4 },
  { name: 'Mar', orders: 7 },
  { name: 'Mie', orders: 5 },
  { name: 'Jue', orders: 10 },
  { name: 'Vie', orders: 8 },
  { name: 'Sab', orders: 3 },
  { name: 'Dom', orders: 1 },
];

export const Dashboard: React.FC<DashboardProps> = ({ repairs, language, userRole }) => {
  const t = getTexts(language);

  // Calculate simple stats
  const pendingCount = repairs.filter(r => r.status === RepairStatus.PENDING || r.status === RepairStatus.DIAGNOSTIC).length;
  const inRepairCount = repairs.filter(r => r.status === RepairStatus.IN_REPAIR).length;
  const readyCount = repairs.filter(r => r.status === RepairStatus.READY).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Stats Grid - Aligned with PDF "5. Pantallas Principales" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title={t.statsPending} 
          value={pendingCount.toString()} 
          trend={t.newEquipments} 
          trendUp={true} 
          icon={<AlertCircle size={24} />} 
          colorClass="bg-yellow-500"
        />
        <StatsCard 
          title={t.statsInShop} 
          value={inRepairCount.toString()} 
          trend={t.activeOrders} 
          trendUp={true} 
          icon={<Wrench size={24} />} 
          colorClass="bg-blue-500"
        />
        <StatsCard 
          title={t.statsReady} 
          value={readyCount.toString()} 
          trend={t.forDelivery} 
          trendUp={true} 
          icon={<CheckCircle2 size={24} />} 
          colorClass="bg-green-500"
        />
        {/* Users might not see total client count logic, but for design consistency we keep the card, maybe disable for USER? */}
        {userRole !== 'USER' && (
          <StatsCard 
            title={t.statsClients} 
            value="142" 
            trend={t.vsLastMonth} 
            trendUp={true} 
            icon={<Users size={24} />} 
            colorClass="bg-purple-500"
          />
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <RepairList repairs={repairs} language={language} userRole={userRole} />
        </div>

        {/* Right Column: Chart */}
        {/* Regular users might not need to see global stats chart, only Admin/Tech */}
        {userRole !== 'USER' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
            <h3 className="text-lg font-bold text-gray-900 mb-6">{t.weeklyChart}</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                  {CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
