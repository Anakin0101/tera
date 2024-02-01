import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { Spacing } from 'theme/Variables';
import { moderateScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultBackground,
    },
    contentContainer: {
      paddingHorizontal: Spacing.xl,
    },
    item: {
      ...Layout.rowHCenter,
      borderRadius: Spacing.m,
      borderColor: Colors.inputBlack50,
      padding: moderateScale(22),
      borderWidth: 0.3,
      marginTop: 24,
      backgroundColor: Colors.white,
    },
    imageContainer: {
      ...Layout.alignItemsStart,
      width: 71,
      height: 45,
      marginBottom: Spacing.xl,
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
    main: {
      marginTop: Spacing.xl,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    section: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xlg,
    },
    btn: { marginHorizontal: Spacing.xl, marginVertical: Spacing.xl },
  });
};
