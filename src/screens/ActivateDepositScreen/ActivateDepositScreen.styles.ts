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
      ...Layout.alignItemsCenter,
      paddingBottom: Spacing.xlg,
    },
    iconContainer: {
      ...Layout.center,
      ...Layout.selfCenter,
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
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
    icon: {
      ...Layout.center,
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
    },
    content: {
      ...Layout.fill,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginLeft: Spacing.m,
    },
  });
};
