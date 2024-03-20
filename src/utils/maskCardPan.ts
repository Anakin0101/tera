export const maskCardPan = (pan: string) => {
  if (typeof pan !== 'string') {
    return pan;
  }

  const lastFour = pan.slice(-4);
  const maskedDigits = '*'.repeat(pan.length - 4);

  let res = '';

  for (let i = 0; i < maskedDigits.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      res += ' ';
    }
    res += maskedDigits[i];
  }

  return `${res} ${lastFour}`;
};

export const maskCardPanShort = (pan: string) => {
  if (typeof pan !== 'string') {
    return pan;
  }

  const lastFour = pan.slice(-4);
  const maskedDigits = '*'.repeat(4);

  return `${maskedDigits} ${lastFour}`;
};
