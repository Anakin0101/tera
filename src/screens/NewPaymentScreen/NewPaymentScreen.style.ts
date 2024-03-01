import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Spacing, Fonts, FontSize } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerTitle: {
      marginBottom: Spacing.xl,
      marginTop: Spacing.xlg,
      fontSize: FontSize.regularPlus,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      ...Fonts.medium,
      lineHeight: 22,
    },
    listWrapper: {
      marginHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxxl,
    },
  });
};
