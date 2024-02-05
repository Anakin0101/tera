import { FeeRule } from 'services/apis/paymentsAPI/paymentsAPI.types';

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
