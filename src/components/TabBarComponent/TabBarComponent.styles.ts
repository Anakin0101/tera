import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontSize, Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { FontFamily, Colors, Layout } = useTheme();

  return StyleSheet.create({
    tabBar: {
      ...Layout.row,
      paddingTop: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: Colors.borderColor,
    },
    tabBarContent: {
      paddingHorizontal: Spacing.xl,
    },
    tabItemCont: {
      ...Layout.center,
      paddingHorizontal: Spacing.md,
      marginRight: Spacing.ml,
      paddingBottom: Spacing.s,
    },
    tabItemContActive: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.primary,
    },
    tabItemLabel: {
      color: Colors.black,
      fontSize: FontSize.small,
      lineHeight: 17,
      letterSpacing: -0.25,
      fontFamily: FontFamily.main,
      paddingHorizontal: Spacing.xxs,
      marginVertical: Spacing.xxs,
    },
  });
};
