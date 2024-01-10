import { useTheme } from 'hooks';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

const useStyles = () => {
  const { Layout, Spacing, Colors } = useTheme();

  return StyleSheet.create({
    wrapper: {
      marginTop: verticalScale(38),
      paddingHorizontal: Spacing.xl - Spacing.xxs,
    },
    chechboxContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.lg,
    },
    buttonCont: {
      marginTop: Spacing.xxl,
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
  });
};

export default useStyles;
