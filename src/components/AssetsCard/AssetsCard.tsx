import React from 'react';
import { View } from 'react-native';
import { useStyles } from './AssetsCard.styles';
import Images from 'theme/Images';
import { AssetsCardProps } from './AssetsCard.types';
import { CardItem } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const AssetsCard: React.FC<AssetsCardProps> = ({ assetsSum, totalSum, currency }) => {
  const securePension = useAppSelector(state => state.dashboard.maskDebit);

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
        isSecure
        value={renderMaskedValue(assetsSum)}
        iconSource={Images().AssetsIcon}
        currency={currency}
      />
      <View style={styles.underline} />
      <CardItem
        isSecure
        title="სესხები"
        value={renderMaskedValue(totalSum)}
        iconSource={Images().LiabilitiesIcon}
        currency={currency}
      />
    </View>
  );
};
