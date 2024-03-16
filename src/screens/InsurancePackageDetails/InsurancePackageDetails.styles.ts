import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();

  return StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.defaultBackground,
    },
    contentContainer: {
      ...Layout.growfull,
    },
    cardContainer: {
      ...Layout.alignItemsCenter,
      paddingVertical: Spacing.xl,
      backgroundColor: Colors.defaultBackground,
    },
    info: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xlg,
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
      ...Fonts.medium,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};
