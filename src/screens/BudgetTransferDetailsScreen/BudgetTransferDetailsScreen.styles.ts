import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontSize } from 'theme/Variables';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    containerWrapper: {
      backgroundColor: Colors.defaultBackground,
      width: '100%',
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
    },
    title: { ...Fonts.titleregularPlus, paddingVertical: Spacing.lg },

    card: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.white,
      paddingVertical: Spacing.l,
      paddingHorizontal: Spacing.ml,
      width: '90%',
      borderRadius: Spacing.m,
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
    budgetInputView: { ...Layout.row },
    customIconComponentStyles: {
      width: 48,
      height: 48,
    },
    userView: {
      marginTop: Spacing.xl,
    },
    input: {
      paddingVertical: Spacing.md,
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
  });
};
