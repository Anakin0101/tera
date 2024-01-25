import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();
  return StyleSheet.create({
    wrapper: {
      ...Layout.row,
      paddingVertical: Spacing.xl,
      ...Layout.justifyContentBetween,
    },
    withTopBorder: {
      borderTopColor: Colors.grayBorderColor,
      borderTopWidth: 1,
    },
    withBottomBorder: {
      borderBottomColor: Colors.grayBorderColor,
      borderBottomWidth: 1,
    },
    leftContainer: {
      ...Layout.row,
      maxWidth: '80%',
    },
    iconContainer: {
      marginRight: Spacing.ml,
      marginLeft: Spacing.md,
      ...Layout.center,
    },
    forwardContainer: {
      ...Layout.center,
      marginLeft: Spacing.lg,
      marginRight: Spacing.md,
    },
    contentContainer: {
      ...Layout.justifyContentCenter,
      flexShrink: 1,
    },
  });
};
