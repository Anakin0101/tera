import { useTheme } from 'hooks';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

const useStyles = () => {
  const { Layout, Spacing, Colors } = useTheme();

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

export default useStyles;
