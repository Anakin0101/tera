import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing } = useTheme();

  return StyleSheet.create({
    container: {},
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    headerTitle: {
      marginBottom: Spacing.xl,
      marginTop: Spacing.xlm,
      fontSize: FontSize.regularPlus,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 22,
    },
    listWrapper: {
      marginHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxxl,
    },
    nextButtonWrapper: {
      marginTop: Spacing.ml,
      marginHorizontal: Spacing.xl,
    },
  });
};
