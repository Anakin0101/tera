import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, FontFamily } = useTheme();
  return StyleSheet.create({
    header: {
      width: '100%',
      marginTop: 8,
    },
    check: {
      paddingHorizontal: 24,
    },
    button: {
      marginTop: 48,
      paddingVertical: Spacing.m,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },
    itemContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      borderBottomWidth: 1,
      borderTopColor: 'rgba(15, 15, 15, 0.05)',
      borderBottomColor: 'rgba(15, 15, 15, 0.05)',
    },
    selected: {
      ...Layout.row,
      paddingVertical: Spacing.xl,
      paddingHorizontal: Spacing.xl,
    },
    textInputWrapperStyle: { marginLeft: 20, width: '90%' },
    buttonWrapperStyle: { marginTop: 20 },
  });
};
