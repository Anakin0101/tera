import { Dimensions } from 'react-native';

const DESIGN_WIDTH = 414;
const DESIGN_HEIGHT = 896;

export const config = {
  domain: 'terabankUrl',
  mobileWidth: Dimensions.get('window').width,
  mobileHeight: Dimensions.get('window').height,
};

export const horizontalScale = (size: number): number => {
  return (config.mobileWidth / DESIGN_WIDTH) * size;
};

export const verticalScale = (size: number): number => {
  return (config.mobileHeight / DESIGN_HEIGHT) * size;
};

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (horizontalScale(size) - size) * factor;
};
