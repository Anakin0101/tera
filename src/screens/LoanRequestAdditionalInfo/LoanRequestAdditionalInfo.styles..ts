import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Colors, FontFamily, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    fieldWrapper: {
      marginTop: Spacing.xl,
    },
    field: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    input: {
      fontSize: FontSize.regular,
      fontFamily: FontFamily.Regular,
      marginTop: Spacing.xxxs,
    },
    arrowContainer: {
      ...Layout.fullWidth,
      ...Layout.absolute,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsEnd,
      height: 50,
    },
    paymendDateInput: {
      top: 10,
    },
    incomeTypeInput: {
      top: 70,
    },
    button: {
      marginVertical: Spacing.ml,
      paddingVertical: 14,
    },
    contentContainer: {
      ...Layout.growfull,
    },
  });
};
