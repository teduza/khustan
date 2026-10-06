import React, { useRef, useState } from 'react';
import { X, Upload, Trash2, Check, Sparkles } from 'lucide-react';
import { BrandLockup } from './BrandLockup';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameLogoUrl: string | null;
  companyLogoUrl: string | null;
  onSaveLogos: (gameLogo: string | null, companyLogo: string | null) => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({
  isOpen,
  onClose,
  gameLogoUrl,
  companyLogoUrl,
  onSaveLogos
}) => {
  const [tempGameLogo, setTempGameLogo] = useState<string | null>(gameLogoUrl || '/favicon.svg');
  const [tempCompanyLogo, setTempCompanyLogo] = useState<string | null>(companyLogoUrl);

  const gameInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleGameFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempGameLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempCompanyLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSaveLogos(tempGameLogo, tempCompanyLogo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#0d0f15] border border-white/15 p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold font-cinzel text-white mb-1">
          Logo Manager
        </h3>
        <p className="text-xs text-neutral-400 mb-6 font-mono">
          Upload game logo & M.A.R.S. COMPANION LLC logo (PNG/JPEG on black background)
        </p>

        {/* Live Preview */}
        <div className="mb-6 p-6 rounded-xl bg-black border border-white/15 flex flex-col items-center justify-center gap-3">
          <span className="text-[10px] text-neutral-500 font-mono tracking-wider">
            LIVE COMBINED LOCKUP
          </span>
          <BrandLockup 
            gameLogoUrl={tempGameLogo} 
            companyLogoUrl={tempCompanyLogo} 
            size="lg" 
          />
        </div>

        {/* Upload Slots */}
        <div className="space-y-4">
          {/* Slot 1: Game Logo (KHUSTAN) */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-neutral-200">
                1. Game Logo (KHUSTAN)
              </span>
              {tempGameLogo && (
                <button
                  onClick={() => setTempGameLogo(null)}
                  className="text-rose-400 hover:text-rose-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
            <input
              type="file"
              ref={gameInputRef}
              onChange={handleGameFile}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />
            <button
              onClick={() => gameInputRef.current?.click()}
              className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-neutral-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>{tempGameLogo ? 'Change Game Logo' : 'Select Game Logo file'}</span>
            </button>
          </div>

          {/* Slot 2: Company Logo (M.A.R.S. COMPANION LLC) */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-neutral-200">
                2. Company Logo (M.A.R.S. COMPANION LLC)
              </span>
              {tempCompanyLogo && (
                <button
                  onClick={() => setTempCompanyLogo(null)}
                  className="text-rose-400 hover:text-rose-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
            <input
              type="file"
              ref={companyInputRef}
              onChange={handleCompanyFile}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />
            <button
              onClick={() => companyInputRef.current?.click()}
              className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-neutral-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>{tempCompanyLogo ? 'Change Company Logo' : 'Select Company Logo file'}</span>
            </button>
          </div>

          {/* Save / Apply */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-600/20"
            >
              <Check className="w-4 h-4" />
              <span>Save & Apply Logos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
