import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    wallet: {
      width: horizontalScale(366),
      height: 56,
      backgroundColor: Colors.textBlack,
      borderRadius: 12,
      ...Layout.center,
      ...Layout.row,
    },
    wallettWrapper: {
      paddingHorizontal: 24,
      paddingVertical: 32,
      ...Layout.center,
      ...Layout.justifyContentCenter,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    customIconComponentStyles: {
      width: 74,
      height: 60,
    },
    text: {
      paddingLeft: Spacing.xs,
    },
  });
};
