import React from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './CardItem.styles';
import { IconComponent, Text } from 'components';
import Images from 'theme/Images';
import { CardItemProps } from './CardItem.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { getCurrencyIcon } from 'utils/currency';

const renderMaskedValue = (
  value: string | number,
  currency: string,
  isSecure: boolean,
  maskDebit: boolean,
) => {
  const stringValue = `${String(value)} ${getCurrencyIcon(currency)}`;
  const maskedValue = '•'.repeat(5);
  const maskedCurrency = '•';
  return isSecure && maskDebit ? `${maskedValue}${maskedCurrency}` : stringValue;
};

export const CardItem: React.FC<CardItemProps> = ({
  title,
  value,
  iconSource,
  isSecure = false,
  currency,
  fromPension,
  onPress,
}) => {
  const styles = useStyles();
  const securePension = useAppSelector(state => state.dashboard);

  const renderedValue = fromPension
    ? renderMaskedValue(value, currency, isSecure, securePension.maskText)
    : renderMaskedValue(value, currency, isSecure, securePension.maskDebit);

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={styles.iconView}>
        <IconComponent
          pngLocalIcon={iconSource}
          customIconComponentStyles={styles.customIconComponentStyles}
        />
        <View style={styles.templateCardContentContainer}>
          <Text
            children={title}
            style={styles.templateCardTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
          <View style={styles.maskedView}>
            <Text
              children={renderedValue}
              style={styles.templateCardAmount}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
        </View>
      </View>
      <View>
        {!fromPension ? (
          <IconComponent
            native
            hasBorder={false}
            pngLocalIcon={Images().ChevronRight}
            customIconComponentStyles={styles.customIconComponentStyles}
          />
        ) : null}
      </View>
    </Pressable>
  );
};
