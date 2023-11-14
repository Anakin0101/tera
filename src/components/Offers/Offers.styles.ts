import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale } from 'utils/config';

export const useStyles = (padding: number) => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    list: {
      marginLeft: Spacing.xl,
    },
    contentContainer: {
      gap: Spacing.m,
      paddingRight: padding,
    },
    title: {
      margin: Spacing.xl,
    },
    offer: {
      ...Layout.row,
      borderRadius: Spacing.m,
      backgroundColor: 'rgb(231, 243, 232)',
      width: horizontalScale(320),
      height: 180,
      padding: 20,
    },
    offerDesc: {
      ...Layout.fill,
      marginLeft: Spacing.m,
      marginTop: Spacing.xs,
    },
    more: {
      ...Layout.alignItemsCenter,
      marginTop: Spacing.l,
      paddingVertical: Spacing.xxs,
      backgroundColor: '#43B64B',
      width: 100,
      borderRadius: 50,
    },
    footer: {
      ...Layout.fill,
      ...Layout.justifyContentEnd,
      marginHorizontal: Spacing.xl,
    },
  });
};
