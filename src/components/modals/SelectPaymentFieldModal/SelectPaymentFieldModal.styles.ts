import useTheme from 'hooks/useTheme';
import { useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Spacing, Layout } = useTheme();
  const { height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      maxHeight: height * 0.7,
    },
    listWrapper: {
      paddingBottom: Spacing.xxxl,
    },
    button: {
      paddingVertical: Spacing.m,
    },
    itemWrapper: {
      paddingTop: Spacing.xl,
    },
    itemContainer: {
      ...Layout.rowCenter,
    },
    itemTitle: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      color: Colors.textBlack500,
      fontFamily: FontFamily.medium,
      letterSpacing: -0.2,
      flex: 1,
    },
    itemSelected: {
      color: Colors.textBlack,
    },
  });
};
