import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';

const ITEM_SIZE = 86;
const ITEM_SPACING = (config.mobileWidth - ITEM_SIZE) / 2;

export const useStyles = () => {
  const { Layout, Spacing, Colors, FontFamily } = useTheme();

  return StyleSheet.create({
    wrapper: {
      ...Layout.fill,
    },
    header: {
      ...Layout.row,
      marginTop: Spacing.xlg,
      backgroundColor: Colors.white,
      borderRadius: Spacing.m,
      padding: Spacing.ml,
      marginHorizontal: Spacing.xl,
      gap: Spacing.m,
    },
    iconContainer: {
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderRadius: Spacing.xl,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    image: {
      ...Layout.fullHeight,
      ...Layout.fullWidth,
      borderRadius: Spacing.xl,
    },
    main: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      paddingVertical: Spacing.xl,
      marginTop: Spacing.xlg,
    },
    inputContainer: {
      ...Layout.row,
      ...Layout.center,
      ...Layout.selfCenter,
      marginTop: Spacing.xs,
      borderRadius: Spacing.m,
      borderColor: Colors.paleGray,
      borderWidth: 1,
      width: 70,
      height: 50,
    },
    input: {
      width: 40,
      height: 50,
    },
    selected: {
      borderColor: Colors.primary,
      backgroundColor: Colors.secondary,
    },
    scrollView: {
      marginTop: Spacing.ml,
    },
    contentContainer: {
      gap: Spacing.m,
      paddingHorizontal: Spacing.xl,
    },
    duration: {
      marginTop: Spacing.xs,
    },
    durationContentContainer: {
      paddingHorizontal: ITEM_SPACING,
    },
    period: {
      padding: Spacing.ml,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
      borderRadius: 100,
    },
    table: {
      borderWidth: 1,
      marginTop: Spacing.xlg,
      borderRadius: Spacing.m,
      borderColor: Colors.inputBlack50,
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.lg,
      marginHorizontal: Spacing.xl,
    },
    tableItem: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    regularRate: {
      ...Layout.absolute,
      textDecorationLine: 'line-through',
      right: 0,
      top: -8,
    },
    specialRate: {
      top: Spacing.s,
    },
    buttonContainer: {
      marginHorizontal: Spacing.xl,
    },
    button: {
      marginTop: 50,
      paddingVertical: 14,
    },
    itemWrapper: {
      ...Layout.center,
      width: 86,
      height: 86,
    },
    itemContainer: {
      ...Layout.center,
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 1,
    },
    itemText: {
      textAlign: 'center',
      fontSize: Spacing.ml,
      fontFamily: FontFamily.Regular,
    },
    disabled: {
      opacity: 0.5,
    },
    unfocused: {
      borderColor: Colors.secondary,
      borderWidth: 1,
      backgroundColor: Colors.white,
    },
    unfocusedText: {
      color: Colors.black700,
    },
    fullHeight: {
      ...Layout.fullHeight,
    },
    buttonMargin: {
      marginTop: 100,
    },
  });
};
