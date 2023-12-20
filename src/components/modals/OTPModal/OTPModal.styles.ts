import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors, FontSize, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
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
    resendView: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentCenter,
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
