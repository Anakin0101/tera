import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config, horizontalScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, Layout, Spacing, FontSize, Fonts } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.headerBackground,
      width: config.mobileWidth,
    },
    scroll: {
      width: config.mobileWidth,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
      height: '100%',
    },
    chooseFromContactWrapper: {
      marginTop: Spacing.md,
      ...Layout.rowHCenter,
    },
    chooseFromLabel: {
      fontSize: FontSize.tiny,
      lineHeight: 16,
      letterSpacing: -0.2,
      color: 'rgba(161, 35, 111, 1)',
      ...Fonts.medium,
      marginLeft: Spacing.md,
    },
    inputContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    inputWrapper: {
      marginHorizontal: Spacing.xl,
      flex: 0.7,
    },
    codeWrapper: {
      bottom: -Spacing.xxs,
    },
    codeBorder: {
      borderBottomColor: Colors.borderColor,
      borderBottomWidth: 1,
      paddingTop: Spacing.xl,
    },
    codeTitle: {
      bottom: -Spacing.xl,
      fontSize: FontSize.tiny,
      lineHeight: 16,
      letterSpacing: -0.2,
      color: Colors.textGray400,
      ...Fonts.medium,
      fontWeight: '400',
    },
    codeValue: {
      bottom: -Spacing.xl,
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: -0.2,
      color: Colors.pinColor,
      ...Fonts.medium,
      fontWeight: '400',
    },
    inputStyle: { width: horizontalScale(250) },
    sectionListContent: {
      ...Layout.overflowHidden,
      paddingBottom: 70,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      backgroundColor: Colors.white,
    },
    template: { paddingVertical: Spacing.lg },
    accountIban: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      height: 50,
      marginTop: 2,
      borderBottomWidth: 1,
      paddingVertical: 5,
      borderBottomColor: Colors.inputBlack50,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    keyboardContainer: {
      ...Layout.fill,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
  });
};
