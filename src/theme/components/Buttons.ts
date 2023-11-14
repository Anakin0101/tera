import { StyleSheet } from 'react-native';
import { Spacing } from 'theme/Variables';
import { CommonParams } from 'types/declarations/theme';

export default function <C>({ Colors, Gutters, Layout }: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.regularHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  };
  const rounded = {
    ...base,
    borderRadius: 10,
  };
  const circle = {
    ...Layout.center,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: Colors.circleButtonBackground,
    color: Colors.circleButtonColor,
    fill: Colors.circleButtonColor,
  };

  return StyleSheet.create({
    base,
    rounded,
    circle,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: Spacing.xxxs,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: Spacing.xxxs,
      borderColor: Colors.primary,
    },
  });
}
