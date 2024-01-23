import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';
import { horizontalScale } from 'utils/config';
export const useStyles = () => {
  const { Layout, Fonts, FontSize, Colors } = useTheme();

  const baseContainerStyle = {
    ...Layout.col,
    ...Layout.justifyContentBetween,
    ...Layout.alignItemsStart,
    height: 188,
    backgroundColor: Colors.gray,
    borderRadius: 12,
    padding: 12,
  };

  return StyleSheet.create({
    templateCardContainer: {
      ...baseContainerStyle,
      width: horizontalScale(158),
      marginRight: Spacing.s,
    },
    containerOneCard: {
      ...baseContainerStyle,
      width: horizontalScale(363),
    },
    containertwoCard: {
      ...baseContainerStyle,
      width: horizontalScale(178),
      marginRight: Spacing.s,
    },
    discardRightMargin: {
      marginRight: Spacing.zero,
    },
    customIconComponentStyles: {
      width: 48,
      height: 48,
    },
    templateCardContentContainer: {
      ...Layout.colCenter,
      marginTop: Spacing.s,
      marginLeft: Spacing.s,
    },
    templateCardTitle: {
      ...Fonts.titleSmall,
      color: Colors.textBlack500,
      width: 100,
      fontWeight: '400',
      lineHeight: FontSize.regular,
    },
    templateCardContent: {
      marginTop: Spacing.s,
      alignSelf: 'flex-start',
      fontSize: FontSize.regular,
      color: Colors.pinColor,
    },
    dateText: {
      alignSelf: 'flex-start',
      fontSize: FontSize.tiny,
      color: Colors.primary,
    },
  });
};
