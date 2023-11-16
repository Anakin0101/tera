import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';
import { FontFamily } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

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
      width: 48,
      height: 48,
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
      width: config.mobileWidth - 48,
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
      width: '80%',
    },
    limitContainer: {
      width: '20%',
      ...Layout.alignItemsEnd,
    },
    button: {
      marginTop: 50,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },
  });
};
