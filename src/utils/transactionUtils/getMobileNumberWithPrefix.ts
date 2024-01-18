import { MOBILE_CODE } from 'utils/transactionUtils/index';

export const getMobileNumberWithPrefix = (mobileNumber: string | undefined): string => {
  if (!mobileNumber) {
    return '';
  }
  return `${MOBILE_CODE}${mobileNumber}`;
};
