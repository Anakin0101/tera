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
    textWrapper: {
      height: 400,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentAround,
      paddingVertical: Spacing.xlm,
    },
    text: { fontSize: FontSize.large, textAlign: 'center', width: 200, lineHeight: 34 },
    amount: { fontSize: FontSize.small, paddingVertical: Spacing.lg },
    btnWrapper: {
      ...Layout.alignItemsCenter,
      height: 150,
      ...Layout.justifyContentEnd,
    },
    wrapper: {
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      height: '100%',
    },
  });
};
