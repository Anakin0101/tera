import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontSize } from 'theme/Variables';

export const useStyleTheme = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    textWrapper: { height: 400, ...Layout.alignItemsCenter, paddingVertical: Spacing.xlm },
    text: { fontSize: FontSize.large, textAlign: 'center' },
    amount: { fontSize: FontSize.small, paddingVertical: Spacing.lg },
    btnWrapper: { ...Layout.alignItemsCenter, height: 200 },
    wrapper: {
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      height: '100%',
    },
  });
};
