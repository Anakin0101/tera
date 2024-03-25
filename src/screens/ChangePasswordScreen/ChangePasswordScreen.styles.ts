import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { verticalScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    wrapper: {
      marginTop: verticalScale(30),
      paddingHorizontal: Spacing.xl - Spacing.xxs,
    },
    chechboxContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.l,
    },
    buttonCont: {
      marginTop: Spacing.xl,
    },
    dividerContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginVertical: Spacing.xl,
    },
    divider: {
      ...Layout.fill,
      backgroundColor: Colors.inputBlack50,
      height: 1,
    },
    text: {
      marginHorizontal: Spacing.ml,
    },
    mainContainer: {
      ...Layout.flexOne,
    },
  });
};
