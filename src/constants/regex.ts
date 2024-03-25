export const REGEX = {
  MAX_LENGTH_11: /^\d{11}$/,
  MAX_LENGTH_22: /^\d{22}$/,
  MAX_LENGTH_9: /^\d{9}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  COMMA_OR_PERIOD: /[.,]/g,
  MATCH_ID: /id:(\d+)/,
  BUDGET: /^\d{8,}$/,
  PHONE: /^5\d{0,8}$/,
  SYMBOLS: /[!@#$%^&*(),.?":{}|<>]`~/,
  LOWECASE_LETTERS: /[a-z]/,
  UPPERCASE_LETTERS: /[A-Z]/,
  NUMBERS: /\d/,
};
