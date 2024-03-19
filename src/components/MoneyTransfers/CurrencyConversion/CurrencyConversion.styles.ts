import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Spacing, FontSize, Layout } = useTheme();

  return StyleSheet.create({
    wrapper: {
      marginTop: Spacing.lg,
      borderWidth: 1.4,
      borderColor: Colors.borderColor,
      paddingVertical: Spacing.ml,
      paddingHorizontal: Spacing.lg,
      borderRadius: 8,
    },
    title: {
      fontSize: FontSize.small,
      lineHeight: 16,
      color: Colors.accountText500,
      fontWeight: '400',
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    desc: {
      fontSize: FontSize.regular,
      lineHeight: 18,
      color: Colors.primary,
      fontWeight: '400',
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    iconStyle: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    iconContainer: {
      marginHorizontal: Spacing.lg,
    },
    container: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      marginTop: Spacing.lg,
    },
    content: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    loadingStyle: {
      marginTop: Spacing.md,
    },
  });
};
