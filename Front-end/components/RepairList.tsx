import React from 'react';
import { RepairOrder, RepairStatus, Language, Role } from '../types';
import { Clock, CheckCircle, AlertCircle, Package, Search } from 'lucide-react';
import { getTexts } from '../utils/translations';
import { formatCurrency } from '../utils/formatters';

interface RepairListProps {
  repairs: RepairOrder[];
  language: Language;
  userRole: Role;
}

const getStatusBadge = (status: RepairStatus) => {
  switch (status) {
    case RepairStatus.READY:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {status}</span>;
    case RepairStatus.PENDING:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {status}</span>;
    case RepairStatus.DIAGNOSTIC:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1"><Search className="w-3 h-3" /> {status}</span>;
    case RepairStatus.IN_REPAIR:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center gap-1"><Clock className="w-3 h-3" /> {status}</span>;
    case RepairStatus.DELIVERED:
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center gap-1"><Package className="w-3 h-3" /> {status}</span>;
    default:
        return <span>{status}</span>
  }
};

export const RepairList: React.FC<RepairListProps> = ({ repairs, language, userRole }) => {
  const t = getTexts(language);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">{t.recentOrders}</h3>
        {/* User Role matrix: Can they see all tickets? Only Tech and Admin. */}
        {(userRole === 'ADMIN' || userRole === 'TECHNICIAN') && (
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">{t.viewAll}</button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium">{t.colId}</th>
              <th className="px-6 py-3 font-medium">{t.colClient}</th>
              <th className="px-6 py-3 font-medium">{t.colEquipment}</th>
              <th className="px-6 py-3 font-medium">{t.colStatus}</th>
              <th className="px-6 py-3 font-medium">{t.colCost}</th>
              <th className="px-6 py-3 font-medium text-right">{t.colAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {repairs.map((repair) => (
              <tr key={repair.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-gray-500">{repair.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{repair.clientName}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-900">{repair.equipmentModel}</span>
                    <span className="text-xs text-gray-400">{repair.observations}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(repair.status)}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(repair.estimatedCost)}</td>
                <td className="px-6 py-4 text-right">
                  {/* Action logic: Users can view, Tech/Admin can manage */}
                  <button className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                    {userRole === 'USER' ? t.btnView : t.btnManage}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};