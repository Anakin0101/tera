import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Spacing, Colors } = useTheme();

  return StyleSheet.create({
    headerWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      padding: Spacing.xl,
    },
    addTemplateButton: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.xxs,
      backgroundColor: Colors.pink,
      paddingHorizontal: Spacing.m,
      paddingVertical: Spacing.s,
      borderRadius: 28,
    },
    list: {
      paddingHorizontal: Spacing.xl,
    },
    templateWrapper: {
      ...Layout.row,
    },
    imageContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    details: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    seeAll: {
      borderWidth: 1,
      borderRadius: 20,
      marginTop: Spacing.xl,
      paddingVertical: Spacing.s,
      ...Layout.alignItemsCenter,
      borderColor: Colors.inputBlack50,
    },
  });
};
