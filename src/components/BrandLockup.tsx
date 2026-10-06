import React from 'react';

interface BrandLockupProps {
  gameLogoUrl?: string | null;
  companyLogoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  onOpenLogoManager?: () => void;
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  gameLogoUrl,
  companyLogoUrl,
  size = 'md',
  onOpenLogoManager
}) => {
  const resolvedGameLogo = gameLogoUrl || '/favicon.svg';

  return (
    <div 
      onClick={onOpenLogoManager}
      className={`inline-flex items-center gap-2.5 sm:gap-3 py-1.5 px-3 rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm transition-all duration-300 ${
        onOpenLogoManager ? 'cursor-pointer hover:border-amber-500/40 hover:bg-black/70' : ''
      }`}
      title={onOpenLogoManager ? "Click to manage / upload logos" : undefined}
    >
      {/* Game Logo from uploaded archive */}
      <div className={`relative flex items-center justify-center rounded-lg bg-black border border-white/15 overflow-hidden shrink-0 ${
        size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-8 h-8'
      }`}>
        <img 
          src={resolvedGameLogo} 
          alt="KHUSTAN Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      {/* Typography: KHUSTAN × M.A.R.S. COMPANION LLC */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className={`font-cinzel font-bold tracking-wider text-white whitespace-nowrap ${
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg sm:text-xl' : 'text-sm'
        }`}>
          KHUSTAN
        </span>

        <span className="text-amber-500 font-mono text-xs">×</span>

        {/* Company logo or full text M.A.R.S. COMPANION LLC */}
        {companyLogoUrl ? (
          <div className={`relative flex items-center justify-center rounded bg-black border border-white/15 overflow-hidden shrink-0 ${
            size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-9 h-9' : 'w-7 h-7'
          }`}>
            <img 
              src={companyLogoUrl} 
              alt="M.A.R.S. COMPANION LLC Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : null}

        <span className={`font-mono font-medium tracking-tight text-neutral-300 whitespace-nowrap ${
          size === 'sm' ? 'text-[10px] sm:text-xs' : size === 'lg' ? 'text-xs sm:text-sm' : 'text-xs'
        }`}>
          M.A.R.S. COMPANION LLC
        </span>
      </div>
    </div>
  );
};
