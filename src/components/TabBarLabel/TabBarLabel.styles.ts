import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Fonts, Colors } = useTheme();

  return StyleSheet.create({
    sectionList: {
      ...Fonts.medium,
    },
    otherBanksStyle: {
      borderWidth: 2,
      borderColor: Colors.inputBlack50,
      borderRadius: 40,
      paddingHorizontal: 10,
      alignItems: 'center',
      height: 38,
      justifyContent: 'center',
    },
    active: {
      backgroundColor: Colors.primaryActionButton,
      borderColor: Colors.textPrimary,
      borderWidth: 1,
    },
  });
};
