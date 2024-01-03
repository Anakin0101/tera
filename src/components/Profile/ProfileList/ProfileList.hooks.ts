import { Confidentiality, EngFlag, GeoFlag, Passcode, Statements } from 'assets/SVGs';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useLanguageSwitcher } from 'components/LanguageSwitcher/useLanguageSwitcher';
import i18next from 'i18next';
import { MODAL_STACK, SETTINGS_SCREEN } from 'navigation/ScreenNames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileItemType } from 'screens/ProfileScreen/ProfileScreen.types';

export const useProfileList = () => {
  const { t } = useTranslation();
  const { savedLanguage, handleLanguageChange } = useLanguageSwitcher();

  const nextLanguage = useMemo(() => {
    const isCurrentLanguageGeo = savedLanguage === LanguageKeys.geo;
    const lng = isCurrentLanguageGeo ? { lng: 'en' } : { lng: 'geo' };
    const region = isCurrentLanguageGeo
      ? t('common.in_english', lng)
      : t('common.in_georgian', lng);

    return region;
  }, [savedLanguage, t]);

  const languageIcon = savedLanguage === LanguageKeys.geo ? EngFlag : GeoFlag;

  const profileListConfig: ProfileItemType[] = [
    {
      index: 0,
      id: 'statement_history',
      icon: Statements,
      text: t('profile.statement_history'),
      navigateTo: {
        stack: MODAL_STACK,
        screen: SETTINGS_SCREEN,
      },
    },
    {
      index: 1,
      id: 'choose_authorization_method',
      icon: Passcode,
      text: t('profile.choose_authorization_method'),
      navigateTo: {
        stack: MODAL_STACK,
        screen: SETTINGS_SCREEN,
      },
    },
    {
      index: 2,
      id: 'switch_to_language',
      icon: languageIcon,
      text: t('profile.switch_to_language', {
        language: nextLanguage,
        lng: savedLanguage === LanguageKeys.geo ? 'en' : 'geo',
      }),
      handlePress: () =>
        handleLanguageChange(
          i18next.language === LanguageKeys.geo ? LanguageKeys.en : LanguageKeys.geo,
        ),
    },
    {
      index: 3,
      id: 'confidentiality_policy',
      icon: Confidentiality,
      text: t('profile.confidentiality_policy'),
      navigateTo: {
        stack: MODAL_STACK,
        screen: SETTINGS_SCREEN,
      },
    },
  ];
  return {
    profileListConfig,
  };
};
