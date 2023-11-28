import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    search: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginTop: Spacing.xl,
      paddingLeft: Spacing.ml,
      backgroundColor: Colors.inputBlack50,
      height: 48,
      borderRadius: 40,
    },
    input: {
      marginLeft: 10,
      width: '80%',
    },
    bold: {
      ...Fonts.textBold,
    },
    account: {
      ...Layout.row,
      marginTop: Spacing.ml,
    },
    cardContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    card: {
      width: 26,
      height: 18,
      borderRadius: 4,
      backgroundColor: Colors.textBlack,
    },
    ibanWrapper: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    iban: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    check: {
      ...Layout.selfCenter,
    },
  });
};
