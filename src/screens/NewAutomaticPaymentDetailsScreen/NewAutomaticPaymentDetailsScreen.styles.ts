import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Spacing, Colors } = useTheme();
  return StyleSheet.create({
    header: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      padding: Spacing.ml,
      borderRadius: Spacing.m,
      marginHorizontal: Spacing.xl,
      marginVertical: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    icon: {
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      margin: Spacing.zero,
      borderWidth: 1,
      borderColor: Colors.borderColor,
    },
    info: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    main: {
      backgroundColor: Colors.white,
      paddingVertical: Spacing.xlg,
      paddingHorizontal: Spacing.xl,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    button: {
      marginVertical: Spacing.xl,
      paddingVertical: 14,
    },
  });
};
