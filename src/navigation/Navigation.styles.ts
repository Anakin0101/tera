import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, FontFamily } = useTheme();
  return StyleSheet.create({
    headerTitleStyle: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: 0.2,
      fontFamily: FontFamily.DemiBold,
      color: Colors.black700,
    },
    whiteHeader: {
      backgroundColor: Colors.white,
      shadowColor: Colors.transparent,
    },
  });
};
