import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useMemo } from 'react';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';

export const useCulture = () => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const culture = useMemo(() => {
    return savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN;
  }, [savedLanguage]);

  const isGeo = useMemo(() => {
    return culture === LanguageKeyForAPIEnum.KA;
  }, [culture]);

  return {
    culture,
    isGeo,
  };
};
