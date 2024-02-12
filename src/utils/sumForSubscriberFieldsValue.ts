import { SubscriberFieldsValue } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen.types';

export const sumForSubscriberFieldsValue = (subscriberInputFieldsValue: SubscriberFieldsValue) => {
  return subscriberInputFieldsValue?.reduce((accumulator, currentValue) => {
    // Parse the value to a number, assuming the values are convertible to numbers
    const numericValue = parseFloat(currentValue?.value);

    // Add the numeric value to the accumulator
    return accumulator + (isNaN(numericValue) ? 0 : numericValue);
  }, 0);
};
