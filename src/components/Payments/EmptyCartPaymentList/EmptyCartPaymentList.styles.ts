import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Layout, Spacing, Fonts, FontSize } = useTheme();

  return StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.white,
      ...Layout.fill,
      ...Layout.justifyContentCenter,
    },
    container: {
      flex: 0.6,
    },
    iconWrapper: {
      ...Layout.alignItemsCenter,
    },
    title: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      color: Colors.black,
      letterSpacing: -0.5,
      ...Fonts.medium,
      marginTop: Spacing.xxxl,
      textAlign: 'center',
    },
    buttonWrapper: {
      marginTop: Spacing.xxl,
      marginHorizontal: Spacing.xxxl,
    },
    buttonText: {
      fontSize: FontSize.regular,
      lineHeight: 20,
      letterSpacing: -0.5,
      ...Fonts.medium,
      paddingVertical: Spacing.xxs,
    },
  });
};
