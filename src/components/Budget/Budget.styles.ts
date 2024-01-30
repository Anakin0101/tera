import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale, verticalScale } from 'utils/config';
export const useStyles = () => {
  const { Layout, Colors, Spacing, FontFamily, Fonts, FontSize } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    budgetTitle: {
      ...Fonts.titleregularPlus,
    },
    budgetView: {
      ...Layout.row,
      ...Layout.justifyContentCenter,
      backgroundColor: Colors.textLightBlue,
      borderRadius: Spacing.m,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.ml,
    },
    budgetData: {
      ...Fonts.titleTiny,
    },
    button: {
      marginTop: Spacing.lg,
      marginBottom: Spacing.xlm,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },

    containerWrapper: {
      backgroundColor: Colors.defaultBackground,
      width: '100%',
      height: 150,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
    },
    card: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.white,
      paddingVertical: 18,
      paddingHorizontal: 15,
      width: '90%',
      borderRadius: 12,
    },
    details: {
      backgroundColor: Colors.defaultBackground,
    },
    wrapper: {
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      paddingLeft: Spacing.xl,
      width: '100%',
      backgroundColor: Colors.white,
      marginTop: 30,
    },
    customIconComponentStyles: {
      width: 48,
      height: 48,
    },
    buttonView: { width: '95%' },
    innerTopContainer: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      ...Layout.alignItemsCenter,
    },
    detailsSectionWrapper: {},
    backgroundWhite: {
      backgroundColor: Colors.white,
    },
    buyWrapper: {
      ...Layout.row,
    },
    textLabel: {
      fontSize: FontSize.small,
    },
    text: { fontSize: FontSize.regular, fontWeight: 'bold' },
    textBuyAmount: { fontSize: FontSize.regular },
    textYourCourse: { fontSize: FontSize.regular, fontWeight: 'bold', color: Colors.primary },
    buttonContainer: {
      marginTop: verticalScale(30),
    },
    outline: {
      width: Spacing.lg,
      height: Spacing.lg,
      borderWidth: Spacing.xxxs,
      borderRadius: Spacing.m,
      ...Layout.center,
      borderColor: Colors.textBlack400,
    },
    inner: {
      width: Spacing.md,
      height: Spacing.md,
      borderRadius: 5,
      backgroundColor: Colors.primary,
    },
    accountName: { marginLeft: Spacing.md },
    selected: {
      borderColor: Colors.primary,
    },
    account: {
      ...Layout.rowHCenter,
      width: horizontalScale(120),
    },
  });
};
