import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
    },
    label: { paddingTop: verticalScale(Spacing.xl), fontSize: verticalScale(FontSize.large) },
    user: {
      fontSize: verticalScale(FontSize.large),
      paddingTop: Spacing.s,
      paddingBottom: verticalScale(Spacing.xl),
    },
  });
};
