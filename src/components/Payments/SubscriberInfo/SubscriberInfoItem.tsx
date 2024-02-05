import React, { memo } from 'react';
import { View } from 'react-native';
import { useStyles } from './SubscriberInfo.styles';
import { Text } from 'components/Text/Text';
import { SubscriberInfoItemProps } from './SubscriberInfo.types';

export const SubscriberInfoItem: React.FC<SubscriberInfoItemProps> = memo(({ name, value }) => {
  const styles = useStyles();

  return (
    <View>
      <Text style={[styles.title, styles.titleMargin]}>{name}</Text>
      <Text style={styles.desc}>{value}</Text>
    </View>
  );
});
