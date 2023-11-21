import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { verticalScale, config, horizontalScale } from 'utils/config';

const { mobileWidth } = config;

const useStyles = () => {
  const { Colors, Layout, Spacing, FontSize, Fonts } = useTheme();

  return StyleSheet.create({
    itemContainer: {
      width: horizontalScale(mobileWidth) - 2 * Spacing.xl,
    },
    imageContainer: {
      height: verticalScale(300),
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
    list: {},
    skipLabel: {
      color: Colors.textBlack500,
    },
    customButtonStyle: {
      marginBottom: Spacing.xs,
    },
  });
};

export default useStyles;
