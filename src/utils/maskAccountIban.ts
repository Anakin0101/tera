export const maskAccountIban = (accountIban: string) => {
  // Check if the input is a valid string
  if (typeof accountIban !== 'string') {
    return accountIban; // Return the original value if it's not a string
  }

  // Extract the first four characters
  const firstFour = accountIban.slice(0, 4);

  // Mask the middle characters with asterisks
  // The length of the masked middle part is the length of the input minus 18
  // you can use .repeat(accountIban.length - 8) if you want to mask all characters
  const maskedMiddle = '*'.repeat(accountIban.length - 18);

  // Extract the last four characters
  const lastFour = accountIban.slice(-4);

  // Concatenate the parts to form the masked string
  const maskedAccountIban = `${firstFour}${maskedMiddle}${lastFour}`;

  return maskedAccountIban;
};
