import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { FontFamily } = useTheme();

  return StyleSheet.create({
    sectionList: {
      fontFamily: FontFamily.medium,
    },
    otherBanksStyle: {
      borderWidth: 2,
      borderColor: 'rgba(29, 29, 29, 0.05)',
      borderRadius: 40,
      paddingHorizontal: 10,
      paddingVertical: 12,
      alignItems: 'center',
      height: 50,
      justifyContent: 'center',
    },
  });
};
