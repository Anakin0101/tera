import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'components';
import { useStyles } from './NewProducts.styles';
import { useNewProducts } from './container';

export const NewProducts = () => {
  const styles = useStyles();
  const { newProducts } = useNewProducts();

  return (
    <View style={styles.wrapper}>
      {newProducts.map((item, index) => (
        <Fragment key={item.title}>
          <View style={styles.container}>
            <View style={styles.iconContainer} />
            <Text children={item.title} />
          </View>
          {index !== newProducts.length - 1 && (
            <Divider height={1} marginTop={16} marginBottom={16} marginLeft={60} />
          )}
        </Fragment>
      ))}
    </View>
  );
};
