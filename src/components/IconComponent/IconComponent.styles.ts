import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout, BorderRadius, Colors } = useTheme();
  return StyleSheet.create({
    iconCommonStyles: {
      width: 32,
      height: 32,
      ...Layout.center,
    },
    iconRoundedStyles: {
      borderRadius: BorderRadius.full,
      backgroundColor: Colors.white,
      padding: Spacing.xs,
      margin: Spacing.xs,
    },
    iconBorderedStyles: {
      borderColor: Colors.gray200,
      borderWidth: 1,
    },
  });
};
