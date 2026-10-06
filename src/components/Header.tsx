import React from 'react';
import { Send, Globe, Upload } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  gameLogoUrl: string | null;
  onOpenLogoManager: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  gameLogoUrl,
  onOpenLogoManager
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07080b]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Brand Mark (Strictly KHUSTAN on all languages) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={currentLang === 'hy' ? '/' : `/${currentLang}`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 text-white"
          >
            <img
              src={gameLogoUrl || '/favicon.svg'}
              alt="KHUSTAN"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded object-contain bg-black border border-white/20 p-0.5"
              referrerPolicy="no-referrer"
            />
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-widest text-white group-hover:text-amber-400 transition-colors">
              KHUSTAN
            </span>
          </a>
        </div>

        {/* Zone 2: Collaboration Reference */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span>In collaboration with</span>
          <a 
            href="https://company.teduza.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-200 hover:text-amber-400 transition-colors font-medium underline underline-offset-4"
          >
            M.A.R.S. COMPANION LLC
          </a>
        </div>

        {/* Zone 3: Language Selector + Telegram Channel + Logo Upload */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Logo upload affordance */}
          <button
            onClick={onOpenLogoManager}
            title="Upload / Preview Logos"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>

          {/* 3-Language Switcher */}
          <div className="flex items-center bg-black/50 border border-white/10 rounded-lg p-0.5 text-xs font-mono">
            <Globe className="w-3 h-3 text-neutral-500 ml-1.5 mr-1 hidden sm:inline-block" />
            <button
              onClick={() => onLanguageChange('hy')}
              title="Հայերեն (Գլխավոր)"
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                currentLang === 'hy'
                  ? 'bg-amber-500/25 text-amber-300 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              HY
            </button>
            <button
              onClick={() => onLanguageChange('ru')}
              title="Русский"
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                currentLang === 'ru'
                  ? 'bg-amber-500/25 text-amber-300 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              title="English"
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-amber-500/25 text-amber-300 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              EN
            </button>
          </div>

          {/* Telegram Channel Button */}
          <a
            href="https://t.me/khustan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-xs font-medium text-white transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">@khustan</span>
          </a>
        </div>
      </div>
    </header>
  );
};
