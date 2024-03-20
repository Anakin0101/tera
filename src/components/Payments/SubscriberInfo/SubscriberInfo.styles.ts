import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Spacing, Fonts, FontSize } = useTheme();

  return StyleSheet.create({
    wrapper: {
      marginTop: Spacing.lg,
      borderWidth: 1.4,
      borderStyle: 'dashed',
      borderColor: Colors.borderColor,
      paddingVertical: Spacing.ml,
      paddingHorizontal: Spacing.lg,
      backgroundColor: Colors.borderBackground,
      borderRadius: 8,
    },
    title: {
      fontSize: FontSize.small,
      lineHeight: 16,
      color: Colors.accountText500,
      ...Fonts.medium,
      fontWeight: '400',
      letterSpacing: -0.2,
    },
    titleMargin: {
      marginTop: Spacing.xl,
    },
    desc: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      color: Colors.textBlack,
      ...Fonts.medium,
      letterSpacing: -0.2,
      fontWeight: '400',
    },
    deptStyle: {
      color: Colors.error,
    },
  });
};
