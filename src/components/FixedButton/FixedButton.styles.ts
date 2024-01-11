import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale, verticalScale } from 'utils/config';
export const useStyles = () => {
  const { Layout, Spacing } = useTheme();

  return StyleSheet.create({
    button: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      width: horizontalScale(178),
      height: verticalScale(56),
    },
    icon: {
      paddingHorizontal: Spacing.md,
    },
  });
};
