import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { verticalScale, config } from 'utils/config';

const { mobileWidth } = config;

const useStyles = () => {
  const { Colors, Layout, Spacing, FontSize, Fonts } = useTheme();

  return StyleSheet.create({
    itemContainer: {
      width: mobileWidth - 2 * Spacing.xl,
    },
    imageContainer: {
      height: verticalScale(350),
    },
    image: {
      ...Layout.fullSize,
    },
    dotContainer: {
      ...Layout.selfCenter,
      ...Layout.row,
      marginTop: verticalScale(45),
      gap: Spacing.s,
    },
    dot: {
      width: Spacing.xxs,
      height: Spacing.xxs,
      borderRadius: Spacing.xxs,
    },
    buttonContainer: {
      marginTop: verticalScale(50),
    },
    textContainer: {
      ...Layout.alignItemsCenter,
      marginTop: verticalScale(32),
    },
    title: {
      color: Colors.textBlack,
      fontSize: FontSize.extraLarge,
      ...Fonts.textCenter,
    },
    desc: {
      ...Fonts.textCenter,
      marginTop: verticalScale(32),
      color: Colors.inactiveTint,
    },
    list: {
      marginTop: verticalScale(Spacing.xxl),
    },
    skipLabel: {
      color: Colors.textBlack500,
    },
  });
};

export default useStyles;
