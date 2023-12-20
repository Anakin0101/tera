import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontSize } from 'theme/Variables';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
      height: '100%',
    },
    containerWrapper: {
      backgroundColor: Colors.defaultBackground,
      width: '100%',
      height: 150,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
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
      borderTopLeftRadius: Spacing.ml,
      borderTopRightRadius: Spacing.ml,
      paddingLeft: Spacing.xl,
      width: '100%',
      backgroundColor: Colors.white,
      marginTop: 30,
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
      backgroundColor: Colors.white,
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
  });
};
