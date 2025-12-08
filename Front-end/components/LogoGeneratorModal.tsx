import React, { useState } from 'react';
import { X, Wand2, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { generateLogoImage } from '../services/geminiService';

interface LogoGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogoSelected: (logoUrl: string) => void;
}

export const LogoGeneratorModal: React.FC<LogoGeneratorModalProps> = ({ isOpen, onClose, onLogoSelected }) => {
  const [prompt, setPrompt] = useState("Diseño de logo para 'TechFix Manager', un software de gestión de taller de reparación de computadoras. Estilo tecnológico, moderno y limpio. Colores: azul eléctrico, gris oscuro y blanco. Icono que combine una llave inglesa y un circuito digital o chip. Fondo blanco, estilo vectorial.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateLogoImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError("Error al generar el logo. Por favor intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (generatedImage) {
      onLogoSelected(generatedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            <h2 className="text-xl font-bold">Generador de Logo TechFix AI</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col md:flex-row gap-6 overflow-y-auto">
          {/* Controls */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prompt del Logo</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                placeholder="Describe cómo quieres que sea tu logo..."
              />
              <p className="text-xs text-gray-500 mt-2">
                La IA creará un logo basado en esta descripción. Puedes editarla para ajustar colores o estilo.
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generar Logo
                </>
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[300px] relative p-4">
            {generatedImage ? (
              <div className="relative group w-full h-full flex flex-col items-center justify-center">
                <img 
                  src={generatedImage} 
                  alt="Logo generado" 
                  className="max-w-full max-h-[250px] object-contain shadow-sm rounded-lg" 
                />
                <button
                  onClick={handleApply}
                  className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium flex items-center gap-2 shadow-lg transform transition-transform hover:scale-105"
                >
                  <Check className="w-4 h-4" />
                  Usar este Logo
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>La vista previa aparecerá aquí</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};