export const maskIban = (iban: string) => {
  if (!iban || iban.length <= 8) return iban;
  return `${iban.substring(0, 4)}****${iban.slice(-4)}`;
};
