import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

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
    contentWrapper: {
      backgroundColor: Colors.headerBackground,
    },
    titleStyle: {
      ...Fonts.titleregularPlus,
    },
  });
};
