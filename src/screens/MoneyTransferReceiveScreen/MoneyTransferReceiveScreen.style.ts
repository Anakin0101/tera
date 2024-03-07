import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerTitle: {
      marginTop: Spacing.xlg,
      fontSize: FontSize.regularPlus,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 22,
      marginHorizontal: Spacing.xl,
    },
    listWrapper: {
      paddingBottom: Spacing.xxxl,
    },
    headerWrapper: {
      marginBottom: Spacing.xl,
    },
  });
};
