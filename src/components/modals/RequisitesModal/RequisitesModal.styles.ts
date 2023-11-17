import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    wrapper: {
      gap: Spacing.ml,
      marginTop: Spacing.ml,
    },
    cotainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.m,
    },
    iconContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    divider: {
      ...Layout.alignSelfEnd,
      width: config.mobileWidth - 108,
    },
    header: {
      ...Layout.center,
    },
  });
};
