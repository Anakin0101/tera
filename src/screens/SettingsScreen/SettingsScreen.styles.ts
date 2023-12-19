import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Fonts, Colors } = useTheme();
  //   TODO - need to create a HOC which will hold all screens with borderTopLeft and right radius
  return StyleSheet.create({
    container: {
      ...Layout.fullSize,
      ...Layout.justifyContentStart,
      paddingTop: Spacing.s,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      flex: 1,
      backgroundColor: Colors.white,
    },
    wrapper: {
      backgroundColor: Colors.headerBackground,
    },
    sectionContainer: {
      marginTop: Spacing.xxs,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    titleStyle: {
      ...Fonts.titleregularPlus,
      marginTop: verticalScale(Spacing.xlg),
      marginBottom: verticalScale(Spacing.xl),
    },
  });
};
