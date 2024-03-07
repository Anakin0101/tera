import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../index';
import { useStyles } from './ChooseService.styles';
import { ServiceItemProps } from './ChooseService.types';

const ServiceItem: FC<ServiceItemProps> = ({ onPress, item }) => {
  const styles = useStyles();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <View style={styles.textContainer}>
          <Text children={item.name} style={styles.title} />
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceItem;
