import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroTeaser } from './components/HeroTeaser';
import { Footer } from './components/Footer';
import { LogoManagerModal } from './components/LogoManagerModal';
import { TRANSLATIONS } from './data/translations';
import { Language } from './types';

export default function App() {
  // Detect language from URL path or local storage, defaulting to Armenian ('hy')
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'hy';

    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/ru')) return 'ru';
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/hy')) return 'hy';

    const saved = localStorage.getItem('khustan_lang') as Language;
    if (saved && (saved === 'hy' || saved === 'ru' || saved === 'en')) {
      return saved;
    }
    return 'hy';
  };

  const [currentLang, setCurrentLang] = useState<Language>(getInitialLanguage);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Logo slots for Game and M.A.R.S. COMPANION LLC
  const [gameLogoUrl, setGameLogoUrl] = useState<string | null>(() => {
    if (typeof window === 'undefined') return '/favicon.svg';
    return localStorage.getItem('khustan_game_logo') || localStorage.getItem('khustan_custom_logo') || '/favicon.svg';
  });

  const [companyLogoUrl, setCompanyLogoUrl] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('khustan_company_logo');
  });

  const [logoModalOpen, setLogoModalOpen] = useState(false);

  // Synchronize document metadata with active language
  const syncDocumentMeta = useCallback((lang: Language) => {
    const t = TRANSLATIONS[lang];
    document.documentElement.lang = lang;
    // Page title strictly KHUSTAN
    document.title = 'KHUSTAN';

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', t.meta.description);
    }

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'KHUSTAN');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t.meta.ogDescription);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', t.meta.locale);

    // Update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', t.meta.canonical);
  }, []);

  useEffect(() => {
    syncDocumentMeta(currentLang);
  }, [currentLang, syncDocumentMeta]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const newLang = getInitialLanguage();
      setCurrentLang(newLang);
      syncDocumentMeta(newLang);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncDocumentMeta]);

  // Smooth page refresh / language switch
  const handleLanguageChange = (newLang: Language) => {
    if (newLang === currentLang) return;

    setIsTransitioning(true);
    const targetPath = newLang === 'hy' ? '/' : `/${newLang}`;
    
    try {
      window.history.pushState({ lang: newLang }, '', targetPath);
    } catch {
      // Ignore in sandbox
    }

    localStorage.setItem('khustan_lang', newLang);

    setTimeout(() => {
      setCurrentLang(newLang);
      syncDocumentMeta(newLang);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 200);
  };

  const handleSaveLogos = (gameLogo: string | null, companyLogo: string | null) => {
    setGameLogoUrl(gameLogo);
    setCompanyLogoUrl(companyLogo);

    if (gameLogo) {
      localStorage.setItem('khustan_game_logo', gameLogo);
    } else {
      localStorage.removeItem('khustan_game_logo');
      localStorage.removeItem('khustan_custom_logo');
    }

    if (companyLogo) {
      localStorage.setItem('khustan_company_logo', companyLogo);
    } else {
      localStorage.removeItem('khustan_company_logo');
    }
  };

  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen bg-[#07080b] text-[#eaeef4] flex flex-col justify-between relative selection:bg-amber-500/20 selection:text-amber-200">
      {/* Smooth Page Refresh Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-[#07080b]/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-150">
          <div className="font-cinzel text-2xl tracking-widest text-white font-black animate-pulse">
            KHUSTAN
          </div>
          <div className="text-xs font-mono text-amber-400 mt-2">
            khustan.online{currentLang === 'hy' ? '' : `/${currentLang}`}
          </div>
        </div>
      )}

      {/* Primary Top Bar */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        gameLogoUrl={gameLogoUrl}
        onOpenLogoManager={() => setLogoModalOpen(true)}
      />

      {/* Main Single-Screen Teaser */}
      <main className="flex-1 flex items-center justify-center">
        <HeroTeaser
          translations={t}
          gameLogoUrl={gameLogoUrl}
          companyLogoUrl={companyLogoUrl}
          onOpenLogoManager={() => setLogoModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        translations={t}
      />

      {/* Logo Upload & Preview Manager */}
      <LogoManagerModal
        isOpen={logoModalOpen}
        onClose={() => setLogoModalOpen(false)}
        gameLogoUrl={gameLogoUrl}
        companyLogoUrl={companyLogoUrl}
        onSaveLogos={handleSaveLogos}
      />
    </div>
  );
}
