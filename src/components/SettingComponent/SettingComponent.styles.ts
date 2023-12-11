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
      overflow: 'hidden',
    },
    settingTextStyle: {
      marginHorizontal: Spacing.m,
      marginTop: Spacing.xl,
      ...Layout.center,
      ...Layout.fullHeight,
      verticalAlign: 'middle',
      flex: 1,
      borderBottomColor: Colors.gray200,
      borderBottomWidth: 1,
      ...Fonts.textSmall,
    },
  });
};
