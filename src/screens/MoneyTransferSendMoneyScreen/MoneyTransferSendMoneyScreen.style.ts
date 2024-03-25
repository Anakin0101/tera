import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    content: {
      marginTop: Spacing.xxxl,
    },
    listWrapper: {
      paddingBottom: Spacing.xxxl,
    },
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    accountMargin: {
      marginTop: Spacing.xl,
    },
    ctaWrapper: {
      ...Layout.absolute,
      bottom: Spacing.xl,
      ...Layout.fullWidth,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    customButtonWrapper: {
      paddingHorizontal: Spacing.xl,
    },
    infoWrapper: {
      marginTop: Spacing.xlg,
      borderWidth: 1.4,
      borderStyle: 'dashed',
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.ml,
      borderRadius: 8,
      borderColor: Colors.borderColor,
      backgroundColor: Colors.borderBackground,
    },
    infoItemWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    infoLabel: {
      color: Colors.textGray400,
    },
  });
};
