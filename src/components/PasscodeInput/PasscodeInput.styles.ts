import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Colors, FontSize, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
      paddingBottom: Spacing.xxl,
    },
    innerTopContainer: {
      marginTop: Spacing.xlg,
      display: 'flex',
      flexDirection: 'column',
      ...Layout.alignItemsCenter,
    },
    title: {
      fontSize: FontSize.large,
      marginBottom: Spacing.m,
      color: Colors.textBlack,
    },
    label: {
      fontSize: FontSize.small,
      marginBottom: 56,
      color: Colors.textBlack500,
    },

    pinWrapper: {
      ...Layout.alignItemsCenter,
      width: '80%',
      justifyContent: 'flex-end',
      marginTop: 70,
    },
  });
};
