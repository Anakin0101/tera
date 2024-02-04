import { StyleSheet, Platform } from 'react-native';
import { useTheme } from 'hooks';
import { IOS_SWITCH_DEFAULT_WIDTH, SWITCH_SCALE } from 'constants/common';
import { moderateScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, Colors } = useTheme();
  return StyleSheet.create({
    scrollView: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    container: {
      ...Layout.growfull,
      paddingHorizontal: Spacing.xl,
    },
    contentContainer: {
      ...Layout.growfull,
    },
    iconContainer: {
      ...Layout.fullWidth,
      ...Layout.absolute,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsEnd,
      height: 50,
      top: 16,
    },
    alertContainer: {
      ...Layout.row,
      borderWidth: 1,
      borderColor: Colors.blue,
      borderRadius: Spacing.s,
      paddingVertical: Spacing.lg,
      paddingLeft: Spacing.xxs,
      backgroundColor: Colors.lightBlue,
      gap: Spacing.s,
      marginTop: Spacing.xlg,
    },
    fill: {
      ...Layout.fill,
    },
    switchContainer: {
      ...Layout.row,
      marginTop: Spacing.xlg,
      ...Platform.select({
        ios: {
          ...Layout.alignItemsCenter,
          marginLeft: -(IOS_SWITCH_DEFAULT_WIDTH - IOS_SWITCH_DEFAULT_WIDTH * SWITCH_SCALE) / 2,
        },
        android: {
          gap: Spacing.xxs,
        },
      }),
    },
    switchLabel: {
      ...Platform.select({
        ios: {
          bottom: moderateScale(Spacing.xxxs),
        },
      }),
    },
    terms: {
      ...Layout.rowHCenter,
      gap: Spacing.xxs,
      marginTop: 70,
    },
    labelStyle: {
      fontSize: moderateScale(14),
      letterSpacing: 0.25,
      lineHeight: 22,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: Colors.inputBlack50,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.ml,
      marginTop: 14,
    },
    button: {
      paddingVertical: 14,
    },
    input: {
      color: Colors.black,
    },
  });
};
