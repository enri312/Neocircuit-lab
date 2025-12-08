import React from 'react';
import { AuditLog, Language } from '../../types';
import { getTexts } from '../../utils/translations';
import { ShieldAlert } from 'lucide-react';

interface AuditViewProps {
  logs: AuditLog[];
  language: Language;
}

export const AuditView: React.FC<AuditViewProps> = ({ logs, language }) => {
  const t = getTexts(language);

  const getActionStyle = (action: string) => {
    if (action.includes('DELETE') || action.includes('REMOVE')) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    if (action.includes('CREATE') || action.includes('ADD')) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    if (action.includes('UPDATE') || action.includes('EDIT')) {
      return "bg-blue-100 text-blue-800 border-blue-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.auditTitle}</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium">{t.colDate}</th>
              <th className="px-6 py-3 font-medium">{t.colUser}</th>
              <th className="px-6 py-3 font-medium">{t.colAction}</th>
              <th className="px-6 py-3 font-medium">{t.colDetails}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                            {log.userName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{log.userName}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded text-xs border font-mono font-bold ${getActionStyle(log.action)}`}>
                       {log.action}
                   </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};