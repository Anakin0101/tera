import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
    },
    iconContainer: {
      ...Layout.center,
      width: 64,
      height: 64,
      borderRadius: 64,
    },
    buttonsContainer: {
      marginTop: Spacing.xlg,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.fullWidth,
    },
    button: {
      paddingVertical: Spacing.m,
      flexGrow: 1,
      margin: Spacing.xs,
    },
    buttonText: {
      ...Fonts.medium,
    },
    userResetDesc: {
      ...Fonts.textCenter,
    },
  });
};
