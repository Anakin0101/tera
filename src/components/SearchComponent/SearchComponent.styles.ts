import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { Colors, FontFamily } from 'theme/Variables';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
      ...Layout.row,
      backgroundColor: Colors.inputBlack50,
      borderRadius: 40,
      height: 48,
      paddingHorizontal: Spacing.ml,
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.xl,
    },
    closeIcon: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      marginLeft: Spacing.xxs,
      color: Colors.textBlack,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
      fontWeight: '400',
      padding: 0,
      letterSpacing: -0.25,
    },
  });
};
