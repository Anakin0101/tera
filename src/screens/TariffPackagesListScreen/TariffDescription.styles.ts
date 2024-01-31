import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, FontSize, FontFamily, Colors } = useTheme();
  return StyleSheet.create({
    mainCard: {
      ...Layout.center,
      marginTop: Spacing.xxl,
      marginBottom: Spacing.xxl,
      paddingHorizontal: 40,
    },
    iconWrapper: {
      width: 100,
      height: 100,
      marginBottom: Spacing.xl,
    },
    icon: {
      width: 45,
      height: 45,
    },
    title: {
      color: Colors.textBlack,
      fontSize: FontSize.regularPlus,
      fontFamily: FontFamily.medium,
      marginBottom: Spacing.ml,
    },
    descriptionText: {
      textAlign: 'center',
      color: Colors.accountText500,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemText: {
      fontSize: 18,
    },
  });
};
