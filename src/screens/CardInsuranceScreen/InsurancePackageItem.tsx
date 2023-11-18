import React, { FC, Fragment } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { Colors, FontSize } from 'theme/Variables';
import { InsurancePackageItemProps } from './CardInsuranceScreen.types';
import { useStyles } from './CardInsuranceScreen.styles';

export const InsurancePackageItem: FC<InsurancePackageItemProps> = ({ item }) => {
  const styles = useStyles();

  return (
    <View style={styles.insuranceItem}>
      <Text medium headline>
        {item.name}
      </Text>
      <Text size={FontSize.regularPlus} color={Colors.textBlack500} marginTop={5}>
        {formatMoney(item.commission)} {CurrencySignMap[item.commissionCcy]} წლიური საკომისიო
      </Text>
      <View style={styles.termsWrapper}>
        {item.terms.map((term, index) => {
          return (
            <Fragment key={index}>
              <View style={styles.terms}>
                <View style={styles.nameContainer}>
                  <Text>{term.name}</Text>
                </View>
                <View style={styles.limitContainer}>
                  <Text demiBold>
                    {term.limit} {CurrencySignMap[term.ccy]}
                  </Text>
                </View>
              </View>
              {index !== item.terms.length - 1 && (
                <Divider
                  width="100%"
                  height={1}
                  marginTop={20}
                  marginBottom={20}
                  color={Colors.inputBlack50}
                />
              )}
            </Fragment>
          );
        })}
      </View>
      <Button.Primary
        fullWidth
        text={item.isSelected ? 'products.cancel' : 'products.select'}
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
    </View>
  );
};
