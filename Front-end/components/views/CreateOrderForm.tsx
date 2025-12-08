import React, { useState } from 'react';
import { Language } from '../../types';
import { getTexts } from '../../utils/translations';
import { User, Laptop, Wrench, Sparkles, Save, X, BrainCircuit } from 'lucide-react';
import { generateDiagnosis } from '../../services/geminiService';

interface CreateOrderFormProps {
  language: Language;
  onCancel: () => void;
  onSave: (data: any) => void;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ language, onCancel, onSave }) => {
  const t = getTexts(language);
  
  // State
  const [problem, setProblem] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAiDiagnosis = async () => {
    if (!problem.trim()) return;
    setIsAnalyzing(true);
    const result = await generateDiagnosis(problem);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ problem, aiAnalysis }); // Pass gathered data
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t.newOrderTitle}</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        
        {/* Section 1: Client Data */}
        <div>
          <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <User size={20} />
            {t.secClient}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldFullName}</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Ej: Juan Pérez" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldDocId}</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Ej: 4.555.666" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldAddress}</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Ej: Av. Siempre Viva 123" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldPhone}</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Ej: 0981-555-0101" />
            </div>
          </div>
        </div>

        {/* Section 2: Equipment Data */}
        <div>
          <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-4 border-b border-gray-100 pb-2 mt-4">
            <Laptop size={20} />
            {t.secEquipment}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldEquipType}</label>
              <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all">
                <option value="NOTEBOOK">NOTEBOOK</option>
                <option value="PC">PC DE ESCRITORIO</option>
                <option value="SMARTPHONE">SMARTPHONE</option>
                <option value="TABLET">TABLET</option>
                <option value="CONSOLE">CONSOLA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldBrand}</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Ej: Dell" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldModel}</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Ej: XPS 15" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fieldSerial}</label>
              <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Ej: JX-2292" />
            </div>
          </div>
        </div>

        {/* Section 3: Problem / AI */}
        <div>
          <div className="flex items-center gap-4 mb-2 mt-4 border-b border-gray-100 pb-2">
             <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                <Wrench size={20} />
                {t.secProblem}
            </h3>
            <button 
                type="button"
                onClick={handleAiDiagnosis}
                disabled={isAnalyzing || !problem}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-50"
            >
                {isAnalyzing ? (
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <BrainCircuit size={14} />
                )}
                {t.btnAiDiagnosis}
            </button>
          </div>
         
          <textarea 
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full h-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none" 
            placeholder={t.fieldProblemPlaceholder}
          />
        </div>

        {/* Section 4: Observations / Diagnosis */}
        <div>
          <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-4 border-b border-gray-100 pb-2 mt-2">
            <Sparkles size={20} />
            {t.secDiagnosis}
          </h3>
          <textarea 
            className="w-full h-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none" 
            placeholder={t.fieldObsPlaceholder}
          />
        </div>

        {/* AI Output Area */}
        {aiAnalysis && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 animate-in slide-in-from-top-4">
                <h4 className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                    <Sparkles size={16} />
                    {t.aiSuggestion}
                </h4>
                <p className="text-sm text-indigo-900 whitespace-pre-line leading-relaxed">
                    {aiAnalysis}
                </p>
            </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-4">
            <button 
                type="button" 
                onClick={onCancel}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
                <X size={18} />
                {t.btnCancel}
            </button>
            <button 
                type="submit" 
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors flex items-center gap-2"
            >
                <Save size={18} />
                {t.btnSave}
            </button>
        </div>

      </form>
    </div>
  );
};