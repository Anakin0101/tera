import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontSize } from 'theme/Variables';
import { config, horizontalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing, Layout, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      ...Layout.row,
      marginHorizontal: Spacing.xl,
      marginVertical: Spacing.ml,
    },
    icon: {
      marginHorizontal: 0,
    },
    contentContainer: {
      marginLeft: Spacing.lg,
      flexGrow: 1,
      ...Layout.justifyContentStart,
    },
    contentWrapper: {
      flexDirection: 'row',
    },
    centerTextContainer: {
      flexGrow: 1,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsStart,
      ...Layout.fullHeight,
    },
    title: {
      ...Fonts.medium,
      maxWidth: horizontalScale(config.mobileWidth) - 130,
      fontSize: FontSize.regular,
    },
    address: {
      lineHeight: FontSize.regular,
      maxWidth: horizontalScale(config.mobileWidth) - 130,
      ...Fonts.textTiny,
      fontSize: FontSize.small,
    },
    rightContainer: {
      width: 50,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsEnd,
    },
    distance: {
      ...Fonts.medium,
    },
  });
};
