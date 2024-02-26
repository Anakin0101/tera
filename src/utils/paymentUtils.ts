import { FeeRule, PaymentFieldValue } from 'services/apis/paymentsAPI/paymentsAPI.types';

export const getFee = (amount: number, feeRules: FeeRule[]) => {
  if (!feeRules || !feeRules.length) {
    return 0;
  }
  feeRules = feeRules.filter(e => amount >= e.amountFrom);
  const feeRule = feeRules.sort((x, y) => y.amountFrom - x.amountFrom)[0];
  if (!feeRule) {
    return 0;
  }
  if (feeRule.fixedAmount > 0) {
    return feeRule.fixedAmount;
  }
  if (feeRule.rate > 0) {
    const fee = (feeRule.rate * amount) / 100;
    if (feeRule.minAmount > 0 && fee < feeRule.minAmount) return feeRule.minAmount;
    if (feeRule.maxAmount > 0 && fee > feeRule.maxAmount) return feeRule.maxAmount;
    return parseFloat(fee.toPrecision(2));
  }
  return 0;
};

/**
 * Update values in array1 based on values from array2 using 'id'.
 * Append objects from array2 to array1 when there is no matching 'id' in array1.
 *
 * @param {Array} array1 - The array to be updated.
 * @param {Array} array2 - The array containing new values.
 * @returns {Array} The updated array1.
 */
export const updateArrayValuesById = (
  array1: Array<PaymentFieldValue>,
  array2: Array<PaymentFieldValue>,
) => {
  array2.forEach(({ id, value }) => {
    const index = array1.findIndex(obj => Number(obj.id) === Number(id));

    if (index !== -1) {
      // If a matching object is found, update its value with the new value from array2
      array1[index].value = value;
    } else {
      // If no matching object is found, append the object from array2 to array1
      array1.push({ id: Number(id), value });
    }
  });

  return array1;
};
