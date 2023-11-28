import { useTheme } from 'hooks';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.overflowHidden,
      backgroundColor: Colors.white,
    },
    headerWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
    },
    headerContainer: {
      ...Layout.fill,
    },
  });
};
