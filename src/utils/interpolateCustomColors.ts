const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export const hexToRgb = (hex: string) => {
  const result = colorRegex.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const interpolateCustomColors = (
  animationValue: number,
  inputRange: number[],
  hexColors: string[],
) => {
  const index = Math.round(animationValue);

  return hexColors[index];
};
