import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    loginScreenContainerStyle: {
      ...Layout.fullSize,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.lg,
    },
    loginScreenWrapperStyle: {
      ...Layout.fullSize,
    },
    languageSwitcherContainer: {
      ...Layout.alignSelfEnd,
    },
    wrappedComponentWrapperStyle: {},
  });
};
