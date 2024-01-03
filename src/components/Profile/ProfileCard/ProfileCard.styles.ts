import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { horizontalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    profileCardContainer: {
      ...Layout.alignItemsStart,
      ...Layout.justifyContentCenter,
      borderColor: Colors.inputBlack50,
      borderRadius: Spacing.m,
      borderWidth: 1,
      width: horizontalScale(176),
      marginBottom: Spacing.m,
      height: 108,
    },
    headerContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    extraDataContainer: {},
    extraDataAbsoluteStyles: {
      ...Layout.absolute,
      top: Spacing.xxs,
      right: Spacing.xxs,
    },
    profileCardStyles: {
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      marginLeft: Spacing.m,
    },
    profileCardText: {
      paddingLeft: Spacing.ml,
      marginTop: Spacing.m,
    },
  });
};
