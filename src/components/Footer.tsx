import React from 'react';
import { Send, ExternalLink, Globe } from 'lucide-react';
import { Language, TranslationContent } from '../types';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  translations: TranslationContent;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  translations
}) => {
  return (
    <footer className="w-full bg-[#050608] border-t border-white/[0.08] py-8 px-4 sm:px-6 lg:px-8 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        {/* Left: Brand & Director Credit */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-cinzel text-sm font-bold tracking-widest text-white">
            KHUSTAN
          </span>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <span className="text-neutral-400 font-armenian">
            {translations.footer.directorCredit}
          </span>
        </div>

        {/* Center: Company & Telegram links */}
        <div className="flex items-center gap-4">
          <a
            href="https://company.teduza.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <span>M.A.R.S. COMPANION LLC</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>

          <span className="text-neutral-600">·</span>

          <a
            href="https://t.me/khustan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3 h-3 text-amber-500" />
            <span>@khustan</span>
          </a>
        </div>

        {/* Right: Clean localized links */}
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-neutral-500" />
          <button
            onClick={() => onLanguageChange('hy')}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              currentLang === 'hy' ? 'text-amber-300 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            HY
          </button>
          <span className="text-neutral-700">/</span>
          <button
            onClick={() => onLanguageChange('ru')}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              currentLang === 'ru' ? 'text-amber-300 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            RU
          </button>
          <span className="text-neutral-700">/</span>
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              currentLang === 'en' ? 'text-amber-300 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </footer>
  );
};
