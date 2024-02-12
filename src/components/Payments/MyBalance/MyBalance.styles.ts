import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    wrapper: {
      marginTop: Spacing.lg,
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      borderTopWidth: 1,
      borderTopColor: Colors.borderColor,
      paddingTop: Spacing.ml,
    },
    container: {
      marginLeft: Spacing.xl,
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    arrowStyle: {
      marginRight: Spacing.xl,
    },
    cardWrapper: {
      width: 48,
      height: 48,
      borderRadius: 48,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      ...Layout.center,
    },
    card: {
      width: 26,
      height: 17,
      borderRadius: 4,
      backgroundColor: Colors.textGray700,
    },
    infoWrapper: {
      marginLeft: Spacing.m,
    },
    title: {
      fontSize: FontSize.tiny,
      lineHeight: 16,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      letterSpacing: -0.5,
      fontWeight: '400',
    },
    desc: {
      fontSize: FontSize.small,
      lineHeight: 18,
      color: Colors.textGray700,
      fontFamily: FontFamily.medium,
      letterSpacing: -0.2,
      fontWeight: '400',
    },
  });
};
