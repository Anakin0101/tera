import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Fonts, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    dashboardTemplatesContainer: {
      ...Layout.col,
    },
    pensionView: {
      paddingLeft: Spacing.xl,
      paddingVertical: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    titleContainer: {
      ...Fonts.textBold,
      fontSize: FontSize.regularPlus,
      fontWeight: '400',
    },
    wrapper: { marginTop: Spacing.m },
  });
};
