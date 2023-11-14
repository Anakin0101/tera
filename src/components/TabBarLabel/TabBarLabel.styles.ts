import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { FontFamily } = useTheme();

  return StyleSheet.create({
    sectionList: {
      fontFamily: FontFamily.medium,
    },
  });
};
