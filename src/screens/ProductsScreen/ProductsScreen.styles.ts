import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();
  return StyleSheet.create({
    bold: {
      ...Fonts.textBold,
    },
    seeAll: {
      borderWidth: 1,
      borderRadius: 20,
      marginTop: Spacing.xl,
      paddingVertical: Spacing.s,
      ...Layout.alignItemsCenter,
      borderColor: Colors.inputBlack50,
    },
    sectionListWrapper: {
      ...Layout.overflowHidden,
      marginTop: 20,
      width: config.mobileWidth,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      borderColor: Colors.white,
      backgroundColor: Colors.white,
    },
    sectionListContent: {
      flexGrow: 1,
      ...Layout.overflowHidden,
      width: config.mobileWidth,
      borderColor: Colors.white,
    },
    footer: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingBottom: Spacing.xl,
      paddingHorizontal: Spacing.xl,
      paddingTop: 48,
    },
    historyButton: {
      marginTop: 20,
    },
  });
};
