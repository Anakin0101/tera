import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { useTheme } from 'hooks';
import { ListItemProps } from './DepositsAndLoans.types';
import { useStyles } from './DepositsAndLoans.styles';

export const ListItem: FC<ListItemProps> = ({ item, isLast, onPress }) => {
  const styles = useStyles();
  const { Colors } = useTheme();

  const isDeposit = 'depositId' in item;

  const isOverdraft = 'overdraftLimit' in item;

  const isCreditCard = 'creditLimit' in item;

  return (
    <Pressable onPress={onPress} style={styles.account}>
      <View style={styles.cardContainer} />
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <View style={styles.textContainer}>
            <Text
              regular
              size={14}
              numberOfLines={1}
              color={Colors.textBlack500}
              children={isDeposit ? item.depositName : item.productName}
            />
            <Text size={16}>
              {formatMoney(
                isOverdraft ? item.overdraftLimit : isCreditCard ? item.creditLimit : item.amount,
                item.currency,
              )}
            </Text>
          </View>
          {isDeposit && (
            <View style={styles.interest}>
              <Text children="products.interest" label color={Colors.textBlack500} />
              <Text label color={Colors.success}>
                +{formatMoney(item.totalInterest, item.currency)}
              </Text>
            </View>
          )}
          {!isDeposit && item.nextPaymentAmount ? (
            <View style={styles.fee}>
              <Text children="products.fee" label color={Colors.textBlack500} />
              <Text
                label
                color={Colors.error}
                children={formatMoney(item.nextPaymentAmount, item.currency)}
              />
            </View>
          ) : null}
        </View>
        {!isLast && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
      </View>
    </Pressable>
  );
};
