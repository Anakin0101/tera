import { EngFlag, GeoFlag } from 'assets/SVGs';
import { Button } from 'components/Button/Button';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { CurrentLanguageState, LanguageKeys } from './LanguageSwitcher.types';
import { getValue, setValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import useTheme from 'hooks/useTheme';

export const LanguageSwitcher = () => {
  const { Colors } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState<CurrentLanguageState>({
    label: 'Eng',
    icon: EngFlag,
  });

  useEffect(() => {
    // Load the saved language from MMKV storage during initialization
    const savedLanguage = getValue(SELECTED_LANGUAGE);

    if (savedLanguage && [LanguageKeys.en, LanguageKeys.geo].includes(savedLanguage)) {
      setCurrentLanguage({
        label: savedLanguage === LanguageKeys.geo ? 'Eng' : 'Geo',
        icon: savedLanguage === LanguageKeys.geo ? EngFlag : GeoFlag,
      });

      i18next.changeLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage({
      label: lang === LanguageKeys.geo ? 'Eng' : 'Geo',
      icon: lang === LanguageKeys.geo ? EngFlag : GeoFlag,
    });

    setValue(SELECTED_LANGUAGE, lang);

    i18next.changeLanguage(lang);
  };

  return (
    <Button.Secondary
      size="medium"
      customWrapperStyle={{ backgroundColor: Colors.gray }}
      text={currentLanguage.label}
      leftIcon={currentLanguage.icon}
      onPress={() =>
        handleLanguageChange(
          i18next.language === LanguageKeys.geo ? LanguageKeys.en : LanguageKeys.geo,
        )
      }
    />
  );
};
