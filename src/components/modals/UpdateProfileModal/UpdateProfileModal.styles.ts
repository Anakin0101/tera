import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();
  return StyleSheet.create({
    rulesWrapper: {
      ...Layout.rowHCenter,
    },
    deleteText: {
      color: Colors.red,
    },
    selectText: {
      color: Colors.black700,
    },
  });
};
