import dayjs from 'dayjs';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { D, DD, DD_MM_YYYY, MMM, MMMM, MM_YYYY, YYYY, YYYY_MM_DD } from 'constants/DateTemplates';

dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

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

const georgianMonthsFull = {
  January: 'იანვარი',
  February: 'თებერვალი',
  March: 'მარტი',
  April: 'აპრილი',
  May: 'მაისი',
  June: 'ივნისი',
  July: 'ივლისი',
  August: 'აგვისტო',
  September: 'სექტემბერი',
  October: 'ოქტომბერი',
  November: 'ნოემბერი',
  December: 'დეკემბერი',
};

export const formatDate = (dateString: string, template = 'YYYY,HH:mm') => {
  if (!dateString) {
    return '';
  }
  const day = dayjs(dateString).format(DD);
  const month = dayjs(dateString).format(MMM) as keyof typeof georgianMonths;
  const yearAndHour = dayjs(dateString).format(template);

  return `${day} ${isEnglish ? month : georgianMonths[month]},${yearAndHour}`;
};

export const getExpirationDate = (dateString: string) => {
  return dayjs(dateString).format(MM_YYYY);
};

export const getFormattedDate = (dateString: string, template = DD_MM_YYYY) => {
  return dayjs(dateString).format(template);
};

export const formatDateFullMonth = (dateString: string, template?: string) => {
  if (!dateString) {
    return '';
  }

  const day = dayjs(dateString, template).format(D);
  const month = dayjs(dateString, template).format(MMMM) as keyof typeof georgianMonthsFull;
  const year = dayjs(dateString, template).format(YYYY);

  return `${day} ${isEnglish ? month : georgianMonthsFull[month]}, ${year}`;
};

export const isDateBefore = (dateString: string) => {
  const current = dayjs();
  const date = dayjs(dateString);

  return current.isSameOrBefore(date, 'date');
};

export const getDaysDifference = (dateString: string) => {
  const date1 = dayjs();
  const date2 = dayjs(dateString);

  return date2.diff(date1, 'day');
};

export const getCurrentDateISO = () => {
  return dayjs().toISOString();
};

export const getDateThreeMonthAgeISO = () => {
  return dayjs().subtract(3, 'month').toISOString();
};

export const getISOString = (dateString: string, template = YYYY_MM_DD) => {
  return dayjs(dateString, template).toISOString();
};

export const getDateMonthsLater = (months: number, template = DD_MM_YYYY) => {
  return dayjs().add(months, 'month').format(template);
};

export const getDateAfter = (days: number, template = YYYY_MM_DD) => {
  return dayjs().add(days, 'day').format(template);
};

export const getAllDatesBetween = (startDate: string, endDate: string) => {
  const dates = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isSameOrBefore(endDate, 'day')) {
    dates.push(currentDate.format(YYYY_MM_DD));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

export const getDate = (dateString: string, template = YYYY_MM_DD) => {
  return dayjs(dateString, template).date();
};

export const getCurrentDate = (template = YYYY_MM_DD) => {
  return dayjs().format(template);
};
