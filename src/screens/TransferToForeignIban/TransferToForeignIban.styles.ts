import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { Spacing } from 'theme/Variables';

export const useStyleTheme = () => {
  const { Layout, Colors, FontSize } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
    },
    buttonsContainer: {
      marginTop: Spacing.lg,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    keyboardContainer: {
      ...Layout.fill,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    wrapper: {
      paddingHorizontal: Spacing.xl,
    },

    buttonView: { width: '95%', marginTop: Spacing.ml },
    innerTopContainer: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      ...Layout.alignItemsCenter,
    },
    title: {
      fontSize: FontSize.large,
      marginBottom: 20,
      color: Colors.textBlack,
    },
    wrapCard: { marginLeft: Spacing.md },
    textAccount: { fontSize: FontSize.tiny, width: 90 },
    label: {
      fontSize: FontSize.small,
      marginBottom: 50,
      color: Colors.textBlack500,
    },

    pinWrapper: {
      ...Layout.alignItemsCenter,
      width: '80%',
      justifyContent: 'flex-end',
      marginTop: 70,
    },
    transferWrapper: {
      width: '100%',
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      paddingVertical: Spacing.xlm,
    },
    inputWrapper: {
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      ...Layout.row,
    },
    transferView: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      width: '90%',
    },
    transferTextView: { ...Layout.justifyContentStart },
    inputView: { ...Layout.row },
    transferFlexEnd: { ...Layout.alignItemsEnd },
    paddedView: { padding: Spacing.xs },
    sellText: { fontSize: FontSize.small, marginLeft: Spacing.md },
    buyText: { fontSize: FontSize.small },
    courseText: { fontSize: FontSize.tiny },
    amountInput: { width: 70, fontSize: FontSize.large },
    cardWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      width: '100%',
    },
    buttonCard: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      borderRadius: 40,
      marginTop: Spacing.xl,
    },
    cardContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    card: {
      width: 26,
      height: 18,
      borderRadius: 4,
      backgroundColor: Colors.textBlack,
    },
    text: { fontSize: FontSize.small, color: Colors.primary },
    inputText: {
      fontSize: FontSize.xxxl,
    },
    textLine: { fontSize: FontSize.small, maxWidth: 90, fontWeight: 'bold' },
    icon: { marginLeft: Spacing.md },
    button: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      borderRadius: 40,
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.m,
      marginTop: Spacing.xl,
      backgroundColor: Colors.primaryActionButton,
    },
    chevronIcon: { marginTop: Spacing.xl },
  });
};
