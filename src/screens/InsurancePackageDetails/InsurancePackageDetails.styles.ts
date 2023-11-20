import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    scrollView: {
      backgroundColor: '#F9F9F9',
    },
    cardContainer: {
      ...Layout.alignItemsCenter,
      paddingVertical: Spacing.xl,
      backgroundColor: '#F9F9F9',
    },
    info: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      paddingHorizontal: Spacing.xl,
      paddingVertical: 32,
    },
    footer: {
      paddingVertical: Spacing.ml,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    agreementContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.s,
    },
    agreement: {
      ...Layout.fill,
      ...Layout.row,
    },
    button: {
      marginTop: Spacing.m,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },
  });
};
