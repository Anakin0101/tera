import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    enterMobileNumber: {
      marginTop: Spacing.xlg,
      marginLeft: Spacing.xl,
      fontSize: FontSize.regularPlus,
      letterSpacing: -0.5,
      color: Colors.pinColor,
      fontFamily: FontFamily.medium,
      lineHeight: 22,
      fontWeight: '400',
    },
    listWrapper: {
      marginHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxxl,
    },
    inputContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginLeft: Spacing.xl,
    },
    inputWrapper: {
      marginHorizontal: Spacing.xl,
      flex: 0.7,
    },
    codeWrapper: {
      flex: 0.3,
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
      fontFamily: FontFamily.medium,
      fontWeight: '400',
    },
    codeValue: {
      bottom: -Spacing.xl,
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: -0.2,
      color: Colors.pinColor,
      fontFamily: FontFamily.medium,
      fontWeight: '400',
    },
    chooseFromContactWrapper: {
      marginTop: Spacing.xl,
      marginHorizontal: Spacing.xl,
      ...Layout.rowHCenter,
    },
    chooseFromLabel: {
      fontSize: FontSize.tiny,
      lineHeight: 16,
      letterSpacing: -0.2,
      color: 'rgba(161, 35, 111, 1)',
      fontFamily: FontFamily.medium,
      marginLeft: Spacing.md,
    },
    nextButtonWrapper: {
      position: 'absolute',
      bottom: Spacing.xlm,
      width: '100%',
      paddingHorizontal: Spacing.xl,
      zIndex: 2,
    },
    templatesList: {
      paddingBottom: 150,
    },
  });
};
