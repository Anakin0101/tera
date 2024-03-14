import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    loadingSpinnerContainer: {
      ...Layout.fill,
      ...Layout.fullSize,
      ...Layout.center,
      backgroundColor: Colors.white,
    },
    loadingSpinner: {
      width: 35,
      height: 35,
    },
    transparentLoadingView: {
      ...StyleSheet.absoluteFillObject,
      ...Layout.absolute,
      ...Layout.center,
    },
  });
};
