import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    cotentContainer: {
      gap: 20,
      paddingRight: Spacing.xxxl,
    },
    flatlist: {
      paddingLeft: Spacing.xl,
    },
    header: {
      padding: Spacing.xl,
      fontSize: FontSize.regularPlus,
      fontWeight: '500',
      lineHeight: 21,
      letterSpacing: -0.2,
    },
    wrapper: {
      ...Layout.center,
      maxWidth: 85,
    },
    iconContainer: {
      ...Layout.center,
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    textContainer: {
      marginTop: Spacing.m,
    },
    title: {
      fontSize: FontSize.tiny,
      lineHeight: 14,
      textAlign: 'center',
      fontWeight: '500',
    },
  });
};
