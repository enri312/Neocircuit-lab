import React, { useState } from 'react';
import { RepairOrder, Language } from '../../types';
import { getTexts } from '../../utils/translations';
import { FileSpreadsheet, PlusCircle } from 'lucide-react';
import { exportToCSV } from '../../utils/exportHelper';
import { formatCurrency } from '../../utils/formatters';
import { CreateOrderForm } from './CreateOrderForm';

interface OrdersViewProps {
  orders: RepairOrder[];
  language: Language;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, language }) => {
  const t = getTexts(language);
  const [isCreating, setIsCreating] = useState(false);

  const handleExport = () => {
    // Prepare data for export
    const exportData = orders.map(o => ({
        ID: o.id,
        Client: o.clientName,
        Equipment: o.equipmentModel,
        EntryDate: o.entryDate,
        Status: o.status,
        Cost: o.estimatedCost,
        Diagnosis: o.diagnosis
    }));
    exportToCSV(exportData, 'NeoCircuit_Orders');
  };

  const handleSaveOrder = (data: any) => {
    // In a real app, this would send data to backend.
    // For now, we just switch back to list view.
    console.log("Saving order:", data);
    setIsCreating(false);
  };

  if (isCreating) {
    return (
        <CreateOrderForm 
            language={language} 
            onCancel={() => setIsCreating(false)} 
            onSave={handleSaveOrder} 
        />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.ordersTitle}</h2>
        <div className="flex gap-3">
            <button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
                <PlusCircle size={18} />
                {t.btnNewOrder}
            </button>
            <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
            <FileSpreadsheet size={18} />
            {t.btnExportExcel}
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium">{t.colId}</th>
              <th className="px-6 py-3 font-medium">{t.colClient}</th>
              <th className="px-6 py-3 font-medium">{t.colEquipment}</th>
              <th className="px-6 py-3 font-medium">{t.colDate}</th>
              <th className="px-6 py-3 font-medium">{t.colStatus}</th>
              <th className="px-6 py-3 font-medium">{t.colCost}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-gray-500">{order.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{order.clientName}</td>
                <td className="px-6 py-4">{order.equipmentModel}</td>
                <td className="px-6 py-4">{order.entryDate}</td>
                <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 border border-gray-200">
                        {order.status}
                    </span>
                </td>
                <td className="px-6 py-4 font-bold text-gray-700">{formatCurrency(order.estimatedCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};