import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config, horizontalScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.headerBackground,
      width: config.mobileWidth,
    },
    scroll: {
      width: config.mobileWidth,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
      height: '100%',
    },
    inputStyle: { width: horizontalScale(250) },
    sectionListContent: {
      ...Layout.overflowHidden,
      paddingBottom: 70,
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      backgroundColor: Colors.white,
    },
    template: { paddingVertical: Spacing.lg },
    accountIban: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      height: 50,
      marginTop: 2,
      borderBottomWidth: 1,
      paddingVertical: 5,
      borderBottomColor: Colors.inputBlack50,
    },
  });
};
