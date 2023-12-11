import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Fonts, Colors } = useTheme();
  //   TODO - need to create a HOC which will hold all screens with borderTopLeft and right radius
  return StyleSheet.create({
    container: {
      flex: 1,
      ...Layout.justifyContentStart,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    wrapper: {
      paddingHorizontal: Spacing.xl,
    },

    titleStyle: {
      ...Fonts.titleregularPlus,
      marginTop: verticalScale(Spacing.xlg),
      marginBottom: verticalScale(Spacing.xl),
    },
  });
};
