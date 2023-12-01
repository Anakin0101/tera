import React from 'react';
import { View } from 'react-native';
import { useStyles } from './AssetsCard.styles';
import Images from 'theme/Images';
import { AssetsCardProps } from './AssetsCard.types';
import { CardItem } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const AssetsCard: React.FC<AssetsCardProps> = ({ assetsSum, totalSum }) => {
  const securePension = useAppSelector(state => state.dashboard.maskText);

  const renderMaskedValue = (value: number) => {
    const stringValue = String(value);
    const maskedValue = stringValue.replace(/./g, '•');
    return securePension ? maskedValue : stringValue;
  };
  const styles = useStyles();

  return (
    <View style={styles.templateCardContainer}>
      <CardItem
        title="ანაბრები"
        value={renderMaskedValue(assetsSum)}
        iconSource={Images().AssetsIcon}
      />
      <View style={styles.underline} />
      <CardItem
        title="სესხები"
        value={renderMaskedValue(totalSum)}
        iconSource={Images().LiabilitiesIcon}
      />
    </View>
  );
};
