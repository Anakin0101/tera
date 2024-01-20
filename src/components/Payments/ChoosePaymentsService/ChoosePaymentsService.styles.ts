import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.white,
      marginTop: Spacing.xlg,
      borderTopRightRadius: Spacing.m,
      borderTopLeftRadius: Spacing.m,
      paddingVertical: Spacing.xl,
    },
    mainTitle: {
      fontSize: FontSize.regularPlus,
      color: Colors.black,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      paddingHorizontal: Spacing.xl,
    },
    listWrapper: {
      paddingHorizontal: Spacing.xl,
      marginTop: Spacing.xl,
    },
    itemWrapper: {
      ...Layout.alignItemsCenter,
    },
    itemWrapperMargin: {
      marginRight: Spacing.xlg,
    },
    itemIconWrapper: {
      width: 56,
      height: 56,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors.borderColor,
    },
    itemTitle: {
      fontSize: FontSize.tiny,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      marginTop: Spacing.m,
      lineHeight: 16,
      textAlign: 'center',
    },
  });
};
