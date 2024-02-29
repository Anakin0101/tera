import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';
import { OPEN_CARD_WIDTH } from 'constants/index';

const { mobileWidth } = config;

const useStyles = () => {
  const { Colors, Layout, MetricsSizes, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.absolute,
      top: MetricsSizes.regular,
      width: mobileWidth,
    },
    scrollViewWrapper: {
      height: 200,
      marginTop: MetricsSizes.regular,
    },
    content: {
      gap: 10,
      paddingLeft: 35,
    },
    overlay: {
      ...Layout.absolute,
      height: 400,
      width: mobileWidth,
      top: MetricsSizes.regular,
    },
    card: {
      borderRadius: Spacing.m,
      padding: Spacing.s,
    },
    image: {
      ...Layout.fullWidth,
      ...Layout.fullHeight,
      ...Layout.overflowHidden,
      borderRadius: Spacing.m,
    },
    contentWrapper: {
      ...Layout.fullSize,
      borderRadius: Spacing.m,
      backgroundColor: Colors.cardBlurLight,
    },
    darkBlur: {
      backgroundColor: Colors.cardBlurDark,
    },
    currencyWrapper: {
      ...Layout.row,
      gap: Spacing.s,
    },
    currencyContainer: {
      ...Layout.center,
      backgroundColor: Colors.currencyBackground,
      borderRadius: Spacing.ml,
    },
    currency: {
      color: Colors.white,
    },
    text: {
      color: Colors.white,
    },
    wrapper: {
      ...Layout.row,
    },
    balanceContainer: {
      ...Layout.absolute,
      ...Layout.justifyContentEvenly,
      top: MetricsSizes.regular,
      left: Spacing.xl,
      height: 120,
      zIndex: 999,
      width: OPEN_CARD_WIDTH - 50,
    },
    availableBalance: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: 10,
      paddingRight: 10,
    },
    actionButtonContainer: {
      ...Layout.row,
      ...Layout.center,
      gap: Spacing.lg,
      marginTop: MetricsSizes.regular,
    },
    actionButton: {
      ...Layout.alignItemsCenter,
    },
    actionButtonIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.white,
      ...Layout.center,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: Colors.inputBlack50,
      ...Layout.center,
    },
    closeEye: {
      ...Layout.absolute,
    },
    balance: {
      top: -5,
    },
    dotContainer: {
      ...Layout.row,
      ...Layout.selfCenter,
      marginTop: Spacing.xl,
      gap: 10,
    },
    dots: {
      ...Layout.absolute,
      top: 55,
    },
    dot: {
      height: Spacing.xxs,
      width: Spacing.xxs,
      borderRadius: Spacing.xxxs,
      backgroundColor: Colors.black200,
    },
    terabytes: {
      width: 130,
      ...Layout.row,
      ...Layout.center,
      gap: Spacing.s,
      padding: Spacing.s,
      backgroundColor: Colors.white,
      borderRadius: MetricsSizes.large,
    },
    contentContainer: {
      paddingLeft: 80,
    },
    amount: {
      color: Colors.white,
    },
  });
};
export default useStyles;
