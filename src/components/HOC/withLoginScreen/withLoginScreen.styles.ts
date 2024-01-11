import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    loginScreenContainerStyle: {
      flex: 1,
    },
    loginScreenWrapperStyle: {
      flex: 1,
      marginHorizontal: Spacing.xxs,
      marginVertical: Spacing.lg,
    },
    languageSwitcherContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: Spacing.xl,
    },
    temporaryThemeCTAContainer: {
      ...Layout.absolute,
      left: 0,
    },
    wrappedComponentWrapperStyle: {
      flexGrow: 1,
    },
  });
};
