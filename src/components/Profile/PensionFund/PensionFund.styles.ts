import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { horizontalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, FontSize } = useTheme();
  return StyleSheet.create({
    pensionFund: {
      marginLeft: Spacing.s,
      fontSize: FontSize.regular,
      maxWidth: horizontalScale(90),
    },
  });
};
