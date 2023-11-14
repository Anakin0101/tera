import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Colors, Layout } = useTheme();
  return StyleSheet.create({
    userInfoBlockContainer: {
      ...Layout.row,
      ...Layout.justifyContentStart,
      padding: Spacing.m,
      marginBottom: 10,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
    },
    userIconContainer: {
      paddingRight: Spacing.s,
    },
    temporaryImage: {
      width: 60,
      height: 60,
      borderRadius: 60,
      backgroundColor: Colors.gray,
    },
    textContainer: {
      ...Layout.col,
    },
    fullNameText: {
      fontSize: FontSize.regularPlus,
      color: Colors.textGray700,
    },
    editParametersText: {
      fontSize: FontSize.small,
      color: Colors.textBlack400,
    },
  });
};
