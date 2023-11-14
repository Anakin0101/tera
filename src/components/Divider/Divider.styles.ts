import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';

export const useStyles = () => {
  const { Colors, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.dashboardBackground,
      height: Spacing.xxs,
      width: config.mobileWidth,
    },
  });
};
