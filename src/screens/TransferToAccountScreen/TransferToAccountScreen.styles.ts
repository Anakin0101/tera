import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Colors, FontSize, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
      paddingVertical: Spacing.xxl,
    },
    buttonView: { width: '95%' },
    innerTopContainer: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      ...Layout.alignItemsCenter,
    },
    title: {
      fontSize: FontSize.large,
      marginBottom: 20,
      color: Colors.textBlack,
    },
    wrapCard: { marginLeft: Spacing.md },
    textAccount: { fontSize: FontSize.tiny, width: 90 },
    label: {
      fontSize: FontSize.small,
      marginBottom: 50,
      color: Colors.textBlack500,
    },

    pinWrapper: {
      ...Layout.alignItemsCenter,
      width: '80%',
      justifyContent: 'flex-end',
      marginTop: 70,
    },
    transferWrapper: {
      ...Layout.justifyContentCenter,
      alignItems: 'center',
      paddingVertical: 30,
    },
    cardWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      width: '90%',
      paddingVertical: 30,
    },
    buttonCard: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      borderRadius: 40,
      marginTop: 24,
    },
    cardContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    card: {
      width: 26,
      height: 18,
      borderRadius: 4,
      backgroundColor: Colors.textBlack,
    },
    text: { fontSize: FontSize.small },
    button: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      borderRadius: 40,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 24,
      backgroundColor: Colors.primaryActionButton,
    },
    chevronIcon: { marginTop: Spacing.xl },
  });
};
