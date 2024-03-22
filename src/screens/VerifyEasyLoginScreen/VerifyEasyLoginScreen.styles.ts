import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Layout, Spacing } = useTheme();
  return StyleSheet.create({
    wrapper: {
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      marginTop: verticalScale(99),
    },
    pinLine: { marginTop: Spacing.xl, marginBottom: Spacing.xlg },
    pinKeyboardContainer: {
      ...Layout.row,
      height: '70%',
    },
  });
};
