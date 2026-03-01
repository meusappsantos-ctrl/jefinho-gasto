
import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';

const IOSInstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // Check if it's already in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

    // Show prompt only if on iOS and not installed
    if (isIOS && !isStandalone) {
      // Show after a short delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 relative overflow-hidden">
        <button 
          onClick={() => setShowPrompt(false)}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
            <PlusSquare className="text-white" size={24} />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="font-bold text-slate-800 text-sm">Instalar no iPhone</h3>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Adicione este app à sua tela de início para acesso rápido e uma experiência em tela cheia.
            </p>
            
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                <span className="flex items-center justify-center w-5 h-5 bg-white rounded shadow-sm border border-slate-200">
                  <Share size={12} className="text-blue-500" />
                </span>
                <span>Toque no botão <strong>Compartilhar</strong> na barra do navegador.</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                <span className="flex items-center justify-center w-5 h-5 bg-white rounded shadow-sm border border-slate-200">
                  <PlusSquare size={12} className="text-slate-700" />
                </span>
                <span>Role para baixo e toque em <strong>Adicionar à Tela de Início</strong>.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Arrow pointing down (simulating pointing to Safari share button) */}
      <div className="flex justify-center mt-2">
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white drop-shadow-sm"></div>
      </div>
    </div>
  );
};

export default IOSInstallPrompt;
