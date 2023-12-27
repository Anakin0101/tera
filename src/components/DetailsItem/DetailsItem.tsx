import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { DetailsItemProps } from './DetailsItem.types';
import { useStyles } from './DetailsItem.styles';

export const DetailsItem: FC<DetailsItemProps> = ({
  label,
  value,
  iban,
  icon,
  card,
  onPress,
  translateProp,
  marginTop,
}) => {
  const styles = useStyles();
  const blockedFundsSection = Array.isArray(value);

  return (
    <View style={[styles.detailsContainer, marginTop ? { marginTop } : null]}>
      <View style={styles.detailsWrapper}>
        <View>
          <Text children={label} color={Colors.textBlack500} />
          {card && <Text children={card} />}
          {blockedFundsSection ? (
            <View style={styles.blockedAmountsContainer}>
              {value.map(item => (
                <Text key={item.ccy}>
                  {CurrencySignMap[item.ccy]}
                  {formatMoney(item.blockedAmount)}
                </Text>
              ))}
            </View>
          ) : (
            <Text
              size={15}
              children={value}
              translateProp={translateProp}
              // style={{ fontWeight: 'bold' }}
            />
          )}
          {iban && <Text children={iban} />}
        </View>
        {icon && (
          <Pressable
            onPress={onPress}
            style={blockedFundsSection ? styles.blockedFundsIcon : styles.detailsIconContainer}
          >
            {icon}
          </Pressable>
        )}
      </View>
    </View>
  );
};
