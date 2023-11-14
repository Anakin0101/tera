import React from 'react';
import { View } from 'react-native';
import { useStyles } from './AssetsCard.styles';
import Images from 'theme/Images';
import { AssetsCardProps } from './AssetsCard.types';
import { CardItem } from 'components';

export const AssetsCard: React.FC<AssetsCardProps> = ({ assetsSum, totalSum }) => {
  const styles = useStyles();

  return (
    <View style={styles.templateCardContainer}>
      <CardItem title="ანაბრები" value={assetsSum} iconSource={Images().AssetsIcon} />
      <View style={styles.underline} />
      <CardItem title="სესხები" value={totalSum} iconSource={Images().LiabilitiesIcon} />
    </View>
  );
};
