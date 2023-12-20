import { Button } from 'components/Button/Button';
import i18next from 'i18next';
import React from 'react';
import { LanguageKeys } from './LanguageSwitcher.types';
import useTheme from 'hooks/useTheme';
import { useLanguageSwitcher } from './useLanguageSwitcher';

export const LanguageSwitcher = () => {
  const { Colors } = useTheme();
  const { currentLanguage, handleLanguageChange } = useLanguageSwitcher();

  return (
    <Button.Secondary
      size="medium"
      customWrapperStyle={{ backgroundColor: Colors.dashboardBackground }}
      text={currentLanguage.label}
      leftIcon={currentLanguage.icon}
      customTextStyle={{ color: Colors.titleBlack }}
      onPress={() =>
        handleLanguageChange(
          i18next.language === LanguageKeys.geo ? LanguageKeys.en : LanguageKeys.geo,
        )
      }
    />
  );
};
