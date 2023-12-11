import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    pinRow: {
      flex: 1,
      flexDirection: 'row',
      marginTop: Spacing.s,
      alignItems: 'center',
    },
    lastRow: {
      flex: 1,
      marginTop: Spacing.s,
      flexDirection: 'row',
      alignItems: 'center',
    },
    withoutFingerPrint: {
      flex: 1,
    },
  });
};
