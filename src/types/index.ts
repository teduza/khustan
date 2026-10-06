export type Language = 'hy' | 'ru' | 'en';

export interface SeoMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string;
  locale: string;
  canonical: string;
}

export interface TranslationContent {
  meta: SeoMeta;
  hero: {
    kicker: string;
    gameTitle: string;
    statusBadge: string;
    description: string;
    telegramCta: string;
    settingValue: string;
  };
  collaboration: {
    label: string;
    companyName: string;
    director: string;
    visitCompany: string;
  };
  footer: {
    copyright: string;
    directorCredit: string;
    telegramChannel: string;
    companyLink: string;
  };
}
