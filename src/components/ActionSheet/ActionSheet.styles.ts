import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();
  return StyleSheet.create({
    modal: {
      ...Layout.justifyContentEnd,
      margin: 14,
    },
    modalContent: {
      borderRadius: Spacing.m,
      marginLeft: Spacing.s,
      marginRight: Spacing.s,
      marginBottom: Spacing.lg,
    },
    firstItem: {
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
    },
    lastItem: {
      borderBottomLeftRadius: 14,
      borderBottomRightRadius: 14,
    },
    cancel: {
      paddingVertical: 15,
      backgroundColor: Colors.white,
      marginTop: Spacing.s,
      borderRadius: 14,
    },
    actionSheetView: {
      paddingVertical: 15,
      backgroundColor: Colors.actionSheetBg,
      borderColor: Colors.actionSheetBorder,
      borderBottomWidth: 1,
    },
    title: {
      backgroundColor: Colors.actionSheetBg,
      borderColor: Colors.actionSheetBorder,
      borderBottomWidth: 1,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      paddingVertical: Spacing.m,
    },
  });
};
