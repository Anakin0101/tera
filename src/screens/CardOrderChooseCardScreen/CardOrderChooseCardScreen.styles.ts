import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { Spacing } from 'theme/Variables';
import { moderateScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    header: {
      ...Layout.alignItemsStart,
      paddingBottom: Spacing.xlg,
    },
    contentContainer: {
      padding: Spacing.xl,
    },
    item: {
      ...Layout.rowHCenter,
      borderRadius: Spacing.m,
      borderColor: Colors.inputBlack50,
      padding: moderateScale(22),
      borderWidth: 1,
      marginTop: 14,
    },
    imageContainer: {
      ...Layout.alignItemsStart,
      width: 110,
      height: 70,
    },
    image: {
      ...Layout.fullHeight,
      ...Layout.fullWidth,
    },
    content: {
      ...Layout.fill,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginLeft: Spacing.m,
    },
    fill: {
      ...Layout.fill,
    },
  });
};
