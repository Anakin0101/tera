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
          <Text center size={12} lineHeight={18} children={item.name} />
        </View>
      </View>
    </Pressable>
  );
};

export default ServiceItem;
