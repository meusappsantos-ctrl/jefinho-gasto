
import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';

const InstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // Check if it's already in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone === true;

    // Only show if on iOS and not already installed
    if (isIOS && !isStandalone) {
      // Check if we've already dismissed it in this session
      const dismissed = sessionStorage.getItem('ios-prompt-dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('ios-prompt-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 p-5 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
        
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
            <PlusSquare className="text-white" size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-lg leading-tight">Instalar no iPhone</h3>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
              Para uma melhor experiência, adicione este app à sua tela de início:
            </p>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200">
                  <Share size={16} className="text-blue-500" />
                </div>
                <span>Toque no botão <strong>Compartilhar</strong> na barra inferior</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200">
                  <PlusSquare size={16} className="text-slate-700" />
                </div>
                <span>Role para baixo e toque em <strong>Tela de Início</strong></span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
