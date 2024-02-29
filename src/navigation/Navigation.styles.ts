import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, Fonts } = useTheme();
  return StyleSheet.create({
    headerTitleStyle: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: 0.2,
      ...Fonts.semiBold,
      color: Colors.black700,
    },
    whiteHeader: {
      backgroundColor: Colors.white,
      shadowColor: Colors.transparent,
    },
  });
};
