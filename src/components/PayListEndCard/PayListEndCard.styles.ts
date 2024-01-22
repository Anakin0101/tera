import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale } from 'utils/config';
import { FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    listFooter: {
      ...Layout.col,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsStart,
      width: horizontalScale(158),
      height: 188,
      backgroundColor: Colors.gray,
      borderRadius: 12,
      marginRight: Spacing.s,
      paddingHorizontal: 19,
      paddingVertical: 17,
    },
    allPayText: {
      alignSelf: 'flex-start',
      fontSize: FontSize.tiny,
      color: Colors.primary,
    },
    icon: {
      width: 24,
      height: 24,
    },
    iconWrapper: {
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      width: 48,
      height: 48,
      backgroundColor: Colors.white,
      borderRadius: 50,
    },
  });
};
