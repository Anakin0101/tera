import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { Layout, Fonts, Spacing, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    noTransactionsWrapper: {
      ...Layout.center,
      paddingVertical: Spacing.m,
    },
    noTransactionsText: {
      color: Colors.textBlack500,
      ...Fonts.medium,
      fontSize: FontSize.small,
      marginTop: Spacing.xlm,
    },
  });
};
