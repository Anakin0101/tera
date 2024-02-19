import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyleTheme = () => {
  const { Spacing, Layout, Fonts, Colors } = useTheme();
  //   TODO - need to create a HOC which will hold all screens with borderTopLeft and right radius
  return StyleSheet.create({
    wrapper: {
      ...Layout.flexOne,
    },
    container: {
      ...Layout.fullSize,
      ...Layout.justifyContentStart,
      paddingTop: Spacing.s,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      flex: 1,
      backgroundColor: Colors.white,
      marginTop: Spacing.m,
    },
    contentWrapper: {
      backgroundColor: Colors.headerBackground,
    },
    titleStyle: {
      ...Fonts.titleregularPlus,
    },
    buildVersionWrapper: {
      marginTop: Spacing.xxxs,
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.xlg,
      paddingVertical: Spacing.md,
    },
    buildVersionLabel: {
      fontSize: FontSize.regular,
      lineHeight: 18,
      fontFamily: FontFamily.medium,
      color: Colors.textGray200,
      fontWeight: '500',
      textAlign: 'right',
      letterSpacing: -0.5,
    },
  });
};
