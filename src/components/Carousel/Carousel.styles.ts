import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { verticalScale } from 'utils/config';
import { SLIDE_WIDTH } from './Carousel.constants';

const useStyles = () => {
  const { Colors, Layout, Spacing, FontSize, Fonts } = useTheme();

  return StyleSheet.create({
    itemContainer: {
      width: SLIDE_WIDTH,
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
      width: '100%',
    },
    title: {
      color: Colors.textBlack,
      fontSize: FontSize.extraLarge,
      ...Fonts.textCenter,
    },
    desc: {
      ...Fonts.textCenter,
      marginTop: verticalScale(32),
      paddingHorizontal: 20,
      color: Colors.inactiveTint,
      width: '100%',
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
