import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors, FontSize, Fonts } = useTheme();
  return StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45,
    },
    container: { ...Layout.alignItemsCenter, height: 500 },
    text: { fontSize: FontSize.large, textAlign: 'center' },
    label: {
      fontSize: FontSize.small,
      textAlign: 'center',
      paddingVertical: Spacing.lg,
    },
    underlineStyleBase: {
      ...Layout.alignItemsCenter,
      width: 45,
      height: 35,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    OTPView: {
      width: '80%',
      height: 50,
      ...Layout.center,
    },
    underlineStyleHighLighted: {
      borderColor: Colors.textBlack400,
    },
    resendView: {
      ...Layout.rowHCenter,
    },
    resendText: {
      ...Fonts.textBold,
      fontSize: FontSize.small,
      textAlign: 'center',
      paddingVertical: Spacing.lg,
      color: Colors.primary,
    },
  });
};
