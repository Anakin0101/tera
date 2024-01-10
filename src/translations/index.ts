import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './resources';
import { getValue, setValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';

const ns = Object.keys(Object.values(resources)[0]);
export const defaultNS = ns[0];

const savedLanguage = getValue(SELECTED_LANGUAGE);
const initialLanguage = savedLanguage || LanguageKeys.geo; // Use the saved language if available, default to 'geo'

setValue(SELECTED_LANGUAGE, initialLanguage);

i18n.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});

export default i18n;
