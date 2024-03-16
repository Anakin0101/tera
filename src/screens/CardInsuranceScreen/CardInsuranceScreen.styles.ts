import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Colors, Layout, Spacing, Fonts } = useTheme();

  return StyleSheet.create({
    sectionList: {
      backgroundColor: Colors.white,
    },
    sectionListContent: {
      paddingBottom: 36,
    },
    generalWrapper: {
      paddingHorizontal: Spacing.xl,
      marginTop: Spacing.m,
    },
    container: {
      ...Layout.row,
      marginTop: Spacing.ml,
    },
    imageContainer: {
      ...Layout.center,
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    details: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    header: {
      margin: Spacing.xl,
      color: Colors.textBlack500,
    },
    listContentContainer: {
      paddingLeft: Spacing.m,
      paddingRight: Spacing.xl,
    },
    packagesContainer: {
      ...Layout.fill,
      marginTop: Spacing.ml,
    },
    insuranceItem: {
      padding: Spacing.xl,
      borderRadius: Spacing.m,
      marginLeft: Spacing.m,
      width: config.mobileWidth - Spacing.xxxl,
      backgroundColor: Colors.insuranceBg,
    },
    termsWrapper: {
      marginTop: 40,
    },
    terms: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    nameContainer: {
      width: '70%',
    },
    limitContainer: {
      width: '30%',
      ...Layout.alignItemsEnd,
    },
    button: {
      marginTop: 50,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      ...Fonts.medium,
    },
  });
};
