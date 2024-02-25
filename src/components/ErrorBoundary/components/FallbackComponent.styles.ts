import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { verticalScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, Layout, Spacing, Fonts } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
      ...Layout.fill,
    },
    wrapper: {
      marginHorizontal: Spacing.xl,
      marginVertical: Spacing.xl,
      ...Layout.fill,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    contentWrapper: {
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
    },
    imageContainer: {
      width: 200,
      height: 200,
      marginTop: verticalScale(140),
    },
    title: {
      ...Fonts.titleLarge,
      ...Fonts.textUppercase,
      marginTop: Spacing.xxl,
    },
    text: {
      marginTop: Spacing.md,
      textAlign: 'center',
      color: Colors.textGray400,
    },
  });
};
