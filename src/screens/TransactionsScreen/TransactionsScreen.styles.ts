import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.headerBackground,
      width: config.mobileWidth,
    },
    sectionListContent: {
      ...Layout.overflowHidden,
      paddingBottom: 70,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      backgroundColor: Colors.white,
    },
  });
};
