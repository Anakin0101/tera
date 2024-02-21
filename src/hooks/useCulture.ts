import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';

export const useCulture = () => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const culture =
    savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN;

  return {
    culture,
  };
};
