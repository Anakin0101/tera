import { EngFlag, GeoFlag } from 'assets/SVGs';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { CurrentLanguageState, LanguageKeys } from './LanguageSwitcher.types';
import { getValue, setValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';

export const useLanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<CurrentLanguageState>({
    label: 'Eng',
    icon: EngFlag,
  });

  const savedLanguage = getValue(SELECTED_LANGUAGE);
  useEffect(() => {
    // Load the saved language from MMKV storage during initialization
    if (savedLanguage && [LanguageKeys.en, LanguageKeys.geo].includes(savedLanguage)) {
      setCurrentLanguage({
        label: savedLanguage === LanguageKeys.geo ? 'Eng' : 'Geo',
        icon: savedLanguage === LanguageKeys.geo ? EngFlag : GeoFlag,
      });

      i18next.changeLanguage(savedLanguage);
    }
  }, [savedLanguage]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage({
      label: lang === LanguageKeys.geo ? 'Eng' : 'Geo',
      icon: lang === LanguageKeys.geo ? EngFlag : GeoFlag,
    });

    setValue(SELECTED_LANGUAGE, lang);

    i18next.changeLanguage(lang);
  };

  return {
    savedLanguage,
    handleLanguageChange,
    currentLanguage,
  };
};
