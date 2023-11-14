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
  June: 'ივნ',
  July: 'ივლ',
  Aug: 'აგვ',
  Sept: 'სექ',
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
