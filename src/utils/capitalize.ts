export const capitalizeWord = (singleWord: string) => {
  return singleWord.charAt(0).toUpperCase() + singleWord.slice(1).toLowerCase();
};

export const capitapizeText = (phrase: string) => {
  return phrase.split(' ').map(capitalizeWord).join(' ');
};
