import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Fonts } = useTheme();

  return StyleSheet.create({
    settingComponentContainer: {
      ...Layout.row,
      ...Layout.justifyContentStart,
      ...Layout.alignItemsCenter,
      flexGrow: 1,
      paddingVertical: Spacing.ml,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray200,
      overflow: 'hidden',
    },
    settingTextStyle: {
      paddingHorizontal: Spacing.m,
      ...Fonts.textSmall,
    },
  });
};
