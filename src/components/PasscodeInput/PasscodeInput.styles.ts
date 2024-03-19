import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Colors, FontSize, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
      flex: 1,
      marginHorizontal: Spacing.xs,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    innerTopContainer: {
      marginTop: verticalScale(Spacing.xlg),
      marginBottom: verticalScale(70),
      ...Layout.alignItemsCenter,
    },
    title: {
      fontSize: FontSize.large,
      lineHeight: FontSize.large,
      marginBottom: Spacing.m,
      color: Colors.textBlack,
    },
    label: {
      fontSize: FontSize.small,
      lineHeight: FontSize.small,
      marginBottom: verticalScale(56),
      color: Colors.textBlack500,
    },
    pinWrapper: {
      flex: 1,
      flexDirection: 'row',
    },
  });
};
