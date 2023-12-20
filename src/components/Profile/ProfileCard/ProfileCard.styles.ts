import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from 'utils/config';

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
      height: verticalScale(108),
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
