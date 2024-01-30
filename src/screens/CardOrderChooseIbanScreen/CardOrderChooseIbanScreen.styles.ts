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
    header: {
      ...Layout.alignItemsStart,
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
    icon: {
      width: 45,
      height: 45,
    },
    contentContainer: {
      paddingHorizontal: Spacing.xl,
    },
    item: {
      ...Layout.rowHCenter,
      borderRadius: Spacing.m,
      borderColor: Colors.inputBlack50,
      padding: moderateScale(16),
      borderWidth: 0.3,
      marginTop: 24,
      backgroundColor: Colors.white,
    },
    imageContainer: {
      ...Layout.center,
      width: 71,
      height: 45,
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
    btnSeconday: {
      marginVertical: Spacing.xl,
    },
    sectionIban: {
      paddingHorizontal: Spacing.xl,
      marginTop: Spacing.xl,
    },
  });
};
