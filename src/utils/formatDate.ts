import dayjs from 'dayjs';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';

const savedLanguage = getValue(SELECTED_LANGUAGE);

const isEnglish = savedLanguage === LanguageKeys.en;

const georgianMonths = {
  Jan: 'იან',
  Feb: 'თებ',
  Mar: 'მარ',
  Apr: 'აპრ',
  May: 'მაი',
  Jun: 'ივნ',
  Jul: 'ივლ',
  Aug: 'აგვ',
  Sep: 'სექ',
  Oct: 'ოქტ',
  Nov: 'ნოე',
  Dec: 'დეკ',
};

export const formatDate = (dateString: string) => {
  const day = dayjs(dateString).format('DD');
  const month = dayjs(dateString).format('MMM') as keyof typeof georgianMonths;
  const yearAndHour = dayjs(dateString).format('YYYY,HH:mm');

  return `${day} ${isEnglish ? month : georgianMonths[month]},${yearAndHour}`;
};

export const getExpirationDate = (dateString: string) => {
  return dayjs(dateString).format('MM/YY');
};

export const getFormattedDate = (dateString: string, template = 'DD-MM-YYYY') => {
  return dayjs(dateString).format(template);
};
