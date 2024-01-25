import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { Spacing } from 'theme/Variables';
import { horizontalScale, verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Layout, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      ...Layout.justifyContentCenter,
      marginHorizontal: Spacing.xxxl,
    },
    wrapper: {
      marginTop: -[Spacing.xxl],
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
    },
    title: {
      marginTop: verticalScale(Spacing.xxl),
      ...Fonts.titleLarge,
      ...Fonts.textCenter,
    },
    description: {
      marginTop: verticalScale(Spacing.lg),
      ...Fonts.description,
      ...Fonts.textCenter,
    },
    wrapperStyle: {
      marginTop: verticalScale(Spacing.xxl),
      width: horizontalScale(240),
    },
  });
};
