import React, { FC } from 'react';
import { ImageBackground, View } from 'react-native';
import { IMAGE_COVER } from 'constants/Images';
import { CreditDisbursementProps } from './Offers.types';
import { useStyles } from './Offers.styles';
import { Button, Text } from '../index';

export const CreditDisbursement: FC<CreditDisbursementProps> = ({ item }) => {
  const styles = useStyles();

  return (
    <View>
      <ImageBackground
        source={{ uri: item?.images?.[0]?.url }}
        style={styles.image}
        resizeMode={IMAGE_COVER}
      >
        <View style={styles.content}>
          <Text children={item?.title} size={18} />
          <Button.Primary text="loans.activate" customWrapperStyle={styles.button} />
        </View>
      </ImageBackground>
    </View>
  );
};
