import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    headerTitle: {
      fontSize: FontSize.large,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.main,
      lineHeight: 34,
      textAlign: 'center',
      marginTop: Spacing.xxxl,
      marginHorizontal: Spacing.xxl,
    },
    icon: {
      width: 40,
      height: 40,
    },
    headerButtonsWrapper: {
      ...Layout.row,
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.xlm,
    },
    headerButtonItem: {
      backgroundColor: Colors.white,
      ...Layout.fill,
      padding: Spacing.ml,
      borderRadius: 12,
    },
    headerButtonItemMargin: {
      marginRight: Spacing.ml,
    },
    headerButtonLabel: {
      fontSize: 14,
      letterSpacing: -0.5,
      fontWeight: '500',
      marginTop: Spacing.m,
    },
    tabWrapper: {
      marginTop: Spacing.xxl,
    },
    dateButton: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.xlg,
      paddingHorizontal: Spacing.m,
    },
    dateButtonWrapper: {
      backgroundColor: Colors.white,
    },
    dateButtonLabel: {
      fontWeight: '500',
    },
  });
};
