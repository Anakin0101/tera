import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Image, Text } from 'components';
import { useStyles } from './NewProducts.styles';
import { ListItemProps } from './NewProducts.types';

export const NewProductItem: FC<ListItemProps> = ({ item, showUnderline }) => {
  const styles = useStyles();
  return (
    <Pressable onPress={item.onPress} key={item.title}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text children={item.title} />
      </View>
      {showUnderline && <Divider height={1} marginTop={16} marginBottom={16} marginLeft={60} />}
    </Pressable>
  );
};
