import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Layout, Spacing } = useTheme();
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      marginTop: verticalScale(86),
      justifyContent: 'space-between',
    },
    innerTopContainer: {
      ...Layout.alignItemsCenter,
      paddingBottom: Spacing.xlg,
    },
    pinContainer: {
      flexGrow: 1,
    },
    pinLine: { marginTop: Spacing.xl },
  });
};
