import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontSize } from 'theme/Variables';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.growfull,
    },
    wrapperCard: {
      backgroundColor: Colors.defaultBackground,
      ...Layout.center,
      ...Layout.growfull,
    },
    containerWrapper: {
      backgroundColor: Colors.white,
      marginTop: Spacing.xlg,
      borderRadius: Spacing.m,
      marginHorizontal: Spacing.xl,
    },
    card: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.white,
      paddingVertical: 18,
      paddingHorizontal: 15,
      width: '90%',
      borderRadius: 12,
    },
    details: {
      backgroundColor: Colors.defaultBackground,
    },
    wrapper: {
      flex: 1,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      marginTop: Spacing.xlg,
    },
    inner: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.m,
    },
    customIconComponentStyles: {
      width: 48,
      height: 48,
    },
    buttonView: { width: '95%' },
    innerTopContainer: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      ...Layout.alignItemsCenter,
    },
    detailsSectionWrapper: {},
    backgroundWhite: {
      ...Layout.growfull,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      marginTop: Spacing.xlg,
      paddingHorizontal: 20,
      width: '100%',
    },
    buyWrapper: {
      ...Layout.row,
    },
    textLabel: {
      fontSize: FontSize.small,
    },
    text: { fontSize: FontSize.regular, fontWeight: 'bold' },
    textBuyAmount: { fontSize: FontSize.regular },
    textYourCourse: { fontSize: FontSize.regular, fontWeight: 'bold', color: Colors.primary },
    buttonContainer: {
      paddingBottom: Spacing.ml,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
    },
  });
};
