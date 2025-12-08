import React from 'react';
import { Equipment, Language } from '../../types';
import { getTexts } from '../../utils/translations';
import { PackageOpen, Laptop, PcCase } from 'lucide-react';

interface InventoryViewProps {
  language: Language;
  type: 'EQUIPMENT' | 'PARTS';
  equipment?: Equipment[];
}

export const InventoryView: React.FC<InventoryViewProps> = ({ language, type, equipment = [] }) => {
  const t = getTexts(language);

  if (type === 'EQUIPMENT') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{t.navEquipment}</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
            + {t.btnManage}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">{t.colId}</th>
                <th className="px-6 py-3 font-medium">{t.colType}</th>
                <th className="px-6 py-3 font-medium">{t.colBrand} / {t.colModel}</th>
                <th className="px-6 py-3 font-medium">{t.colSerial}</th>
                <th className="px-6 py-3 font-medium">{t.colCondition}</th>
                <th className="px-6 py-3 font-medium text-right">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-500">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.type === 'Notebook' ? (
                        <Laptop className="w-4 h-4 text-blue-500" />
                      ) : (
                        <PcCase className="w-4 h-4 text-purple-500" />
                      )}
                      <span className="font-medium text-gray-700">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.brand}</div>
                    <div className="text-xs text-gray-500">{item.model}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">
                    {item.serialNumber}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs border border-gray-200">
                      {item.physicalCondition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                      {t.btnView}
                    </button>
                  </td>
                </tr>
              ))}
              {equipment.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                        No hay equipos registrados.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Fallback for PARTS or other future types
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-gray-800">{t.navParts}</h2>
       
       <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <PackageOpen size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Módulo en construcción</h3>
            <p className="text-gray-500 mt-2 max-w-md">
                Esta sección de Repuestos estará disponible próximamente con gestión completa de inventario.
            </p>
       </div>
    </div>
  );
};