import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontSize, FontFamily } = useTheme();
  return StyleSheet.create({
    icon: {
      width: 88,
      height: 88,
      backgroundColor: Colors.grayBorderColor,
    },
    userWrapper: {
      ...Layout.center,
      marginTop: Spacing.xl,
    },
    container: {
      padding: Spacing.lg,
    },
    textInput: {
      minHeight: 40,
      borderColor: Colors.grayBorderColor,
      borderWidth: 1,
      padding: Spacing.md,
    },
    rulesContainer: {
      width: '100%',
    },
    rulesWrapper: {
      ...Layout.rowHCenter,
    },

    valid: {
      color: Colors.success,
    },
    notValid: {
      color: Colors.rulesColor,
    },
    EditIcon: {
      width: 32,
      height: 32,
      backgroundColor: Colors.white,
    },
    EditIconWrapper: {
      ...Layout.center,
      ...Layout.absolute,
      top: 45,
      right: 135,
    },
    doneWrapper: {
      ...Layout.absolute,
      ...Layout.bottom0,
      ...Layout.right0,
      top: 25,
    },
    main: {
      paddingHorizontal: Spacing.ml,
      paddingBottom: Spacing.xxl,
    },
    userNameTitle: {
      fontSize: FontSize.tiny,
      color: Colors.rulesColor,
      fontFamily: FontFamily.main,
    },
    userName: {
      fontSize: FontSize.regular,
      color: Colors.pinColor,
      fontFamily: FontFamily.main,
      marginTop: Spacing.xxs,
    },
    deleteText: {
      color: Colors.red,
    },
    selectText: {
      color: Colors.black700,
    },
  });
};
