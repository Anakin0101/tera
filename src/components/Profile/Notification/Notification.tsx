import React from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './Notification.styles';
import { Text } from 'components/Text/Text';

export const Notification = ({ notificationsQTY }: { notificationsQTY?: number }) => {
  const styles = useStyleTheme();
  return notificationsQTY && notificationsQTY > 0 ? (
    <View style={styles.notificationCircle}>
      <Text children={notificationsQTY} style={styles.notificationsQTY} />
    </View>
  ) : null;
};
