import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { DetailsItemProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';

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
      <View style={blockedFundsSection ? styles.blockedFundsContainer : styles.detailsWrapper}>
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
            <Text children={value} translateProp={translateProp} />
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
