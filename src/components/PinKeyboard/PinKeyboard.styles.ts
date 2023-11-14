import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    pinRow: {
      flexDirection: 'row',
      marginTop: Spacing.s,
      width: '100%',
      justifyContent: 'space-between',
    },
    lastRow: {
      marginTop: Spacing.s,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    withoutFingerPrint: {
      width: 70,
    },
  });
};
