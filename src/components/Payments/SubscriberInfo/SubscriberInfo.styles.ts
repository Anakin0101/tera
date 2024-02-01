import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing } = useTheme();

  return StyleSheet.create({
    wrapper: {
      marginTop: Spacing.lg,
      borderWidth: 1.4,
      borderStyle: 'dashed',
      borderColor: Colors.borderColor,
      paddingVertical: Spacing.ml,
      paddingHorizontal: Spacing.lg,
      backgroundColor: 'rgba(244, 244, 244, 0.4)',
      borderRadius: 8,
    },
    title: {
      fontSize: FontSize.small,
      lineHeight: 16,
      color: Colors.accountText500,
      fontFamily: FontFamily.medium,
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
      fontFamily: FontFamily.medium,
      letterSpacing: -0.2,
      fontWeight: '400',
    },
    deptStyle: {
      color: Colors.error,
    },
  });
};
