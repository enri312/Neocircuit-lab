import React from 'react';
import { Client, Language } from '../../types';
import { getTexts } from '../../utils/translations';
import { Download, Printer } from 'lucide-react';
import { calculateSeniority, getClientCategory, printElement } from '../../utils/exportHelper';

interface ClientsViewProps {
  clients: Client[];
  language: Language;
}

export const ClientsView: React.FC<ClientsViewProps> = ({ clients, language }) => {
  const t = getTexts(language);

  const handlePrint = () => {
    printElement('client-table-container');
  };

  const getCategoryLabel = (date: string) => {
      const cat = getClientCategory(date);
      if (cat === 'NEW') return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">{t.catNew}</span>;
      if (cat === 'VIP') return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">{t.catVip}</span>;
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold">{t.catRegular}</span>;
  };

  const getSeniorityLabel = (date: string) => {
      const { years, months } = calculateSeniority(date);
      return `${years}y ${months}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.clientsTitle}</h2>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
        >
          <Printer size={18} />
          {t.btnExportPDF}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" id="client-table-container">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">{t.colClient}</th>
              <th className="px-6 py-3 font-medium">Email / {t.colDetails}</th>
              <th className="px-6 py-3 font-medium">{t.colDate}</th>
              <th className="px-6 py-3 font-medium">{t.colSeniority}</th>
              <th className="px-6 py-3 font-medium text-center">{t.colCategory}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-gray-500">{client.id}</td>
                <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{client.fullName}</div>
                    <div className="text-xs text-gray-500">{client.documentId}</div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-gray-900">{client.email}</div>
                    <div className="text-xs text-gray-400">{client.phone}</div>
                </td>
                <td className="px-6 py-4">{client.entryDate}</td>
                <td className="px-6 py-4 font-mono">{getSeniorityLabel(client.entryDate)}</td>
                <td className="px-6 py-4 text-center">{getCategoryLabel(client.entryDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};