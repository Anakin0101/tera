import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStackStyles = () => {
  const { Colors, Spacing } = useTheme();
  return StyleSheet.create({
    headerTitle: {
      fontSize: Spacing.l,
      color: Colors.textBlack,
      fontWeight: '700',
    },
    nestHeaderTitle: {
      fontSize: Spacing.ml,
      color: Colors.textBlack,
    },
  });
};
