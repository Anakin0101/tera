import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, Colors, FontSize } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.justifyContentCenter,
      padding: Spacing.xl,
      paddingBottom: Spacing.xxl,
    },
    handle: {
      margin: -Spacing.m,
      padding: Spacing.zero,
    },
    handleIndicator: {
      height: 4,
      width: 40,
      backgroundColor: Colors.textWhite400,
    },
    closeButton: {
      ...Layout.alignSelfEnd,
      marginBottom: Spacing.m,
    },
    titleContainer: {
      flexDirection: 'row',
      height: 40,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
    },
    title: {
      fontSize: FontSize.regularPlus,
      color: Colors.textBlack,
    },
  });
};
