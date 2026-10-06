import React from 'react';
import { Send, ExternalLink, MapPin, Compass } from 'lucide-react';
import { TranslationContent } from '../types';
import { BrandLockup } from './BrandLockup';

interface HeroTeaserProps {
  translations: TranslationContent;
  gameLogoUrl: string | null;
  companyLogoUrl: string | null;
  onOpenLogoManager: () => void;
}

export const HeroTeaser: React.FC<HeroTeaserProps> = ({
  translations,
  gameLogoUrl,
  companyLogoUrl,
  onOpenLogoManager
}) => {
  return (
    <section className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Background Visual: Mount Khustup & Kapan teaser backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/khustan_kapan_teaser_1791322324773.jpg"
          alt="KHUSTAN 3D Game Kapan Armenia"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.12] scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Deep contrast gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/75 to-[#07080b]/90" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#07080b]/60 to-[#07080b]" />
      </div>

      {/* Main Teaser Center Container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Coordinates & Status (Unboxed clean monospace typography) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-neutral-400 tracking-wider mb-6 font-mono-nums">
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>39°12′04″ N 46°24′54″ E</span>
          </span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>KAPAN · ARMENIA</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-300 font-semibold">{translations.hero.statusBadge}</span>
        </div>

        {/* Dual Brand Lockup: KHUSTAN × M.A.R.S. COMPANION LLC */}
        <div className="mb-6">
          <BrandLockup 
            gameLogoUrl={gameLogoUrl}
            companyLogoUrl={companyLogoUrl}
            onOpenLogoManager={onOpenLogoManager}
            size="md"
          />
        </div>

        {/* Display Title — strictly KHUSTAN on all languages */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-cinzel tracking-widest text-white mb-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] select-none">
          KHUSTAN
        </h1>

        {/* Setting / Subtitle */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-amber-300/90 mb-4 uppercase">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{translations.hero.settingValue}</span>
        </div>

        {/* Short, honest teaser note */}
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed mb-8 font-light font-armenian">
          {translations.hero.description}
        </p>

        {/* Single Primary Action: Official Telegram Channel */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs mb-10">
          <a
            href="https://t.me/khustan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition-all duration-200 shadow-[0_0_25px_rgba(217,119,6,0.35)] hover:shadow-[0_0_35px_rgba(217,119,6,0.5)] cursor-pointer whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            <span>{translations.hero.telegramCta}</span>
          </a>
        </div>

        {/* Verified Collaboration Credit Box */}
        <div className="w-full max-w-md pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-mono gap-3">
          <div className="text-center sm:text-left">
            <span className="text-neutral-500 block text-[10px]">COLLABORATION</span>
            <a
              href="https://company.teduza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-200 hover:text-amber-400 inline-flex items-center gap-1 font-medium transition-colors"
            >
              <span>M.A.R.S. COMPANION LLC</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
          </div>

          <div className="text-center sm:text-right font-armenian">
            <span className="text-neutral-500 block text-[10px] font-mono">CREATOR / DIRECTOR</span>
            <span className="text-neutral-300">{translations.collaboration.director}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
