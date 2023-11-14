import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, FontSize } = useTheme();

  return StyleSheet.create({
    AuthorizationMethodContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      paddingVertical: Spacing.ml,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray200,
      overflow: 'hidden',
    },
    AuthorizationMethodLeftContainer: {
      ...Layout.row,
      ...Layout.fullHeight,
      ...Layout.fill,
    },
    iconContainer: {},
    textContainer: {
      paddingHorizontal: Spacing.m,
      width: '90%',
    },
    AuthorizationMethodTitleStyle: {
      paddingBottom: Spacing.xxs,
      fontSize: FontSize.small,
      color: Colors.textBlack,
    },
    AuthorizationMethodDescStyle: {
      color: Colors.textBlack500,
    },

    AuthorizationMethodEnablerContainer: {
      ...Layout.colCenter,
    },
  });
};
