import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors, FontSize, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
      height: verticalScale(200),
      paddingHorizontal: Spacing.xxl,
    },
    OTPNumberLabel: { fontSize: verticalScale(FontSize.large), textAlign: 'center' },
    OTPInputContainer: { flexDirection: 'row', justifyContent: 'center', height: 50 },
    inputItem: {
      width: Spacing.xxl,
      height: Spacing.xxxl,
      margin: Spacing.xs,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray200,
    },
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
