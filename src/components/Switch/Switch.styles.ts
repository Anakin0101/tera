import { SWITCH_SCALE } from 'constants/common';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        transform: [{ scaleX: SWITCH_SCALE }, { scaleY: SWITCH_SCALE }],
      },
    }),
  },
});
