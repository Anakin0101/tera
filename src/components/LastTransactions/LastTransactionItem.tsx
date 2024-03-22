import React, { FC, memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from 'hooks';
import { Divider, IconComponent, Text } from '../index';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { LastTransactionProps } from './LastTransaction.types';
import { useStyles } from './LastTransactions.styles';
import { Income, Outcome, TransactionLock } from 'assets/SVGs';

const LastTransactionItem: FC<LastTransactionProps> = memo(
  ({ item, onPress, showUnderline = true, blockedTransactionsFilterActive }) => {
    const styles = useStyles();
    const { Colors } = useTheme();

    const { isIncome, description, currency, amount, docDate } = item;

    const handlePress = useCallback(() => {
      onPress(item);
    }, [item, onPress]);

    const transactionIcon = useMemo(() => {
      if (blockedTransactionsFilterActive) {
        return <IconComponent IconJSX={TransactionLock} customIconComponentStyles={styles.Icon} />;
      } else {
        if (isIncome) {
          return (
            <IconComponent
              IconJSX={Income}
              customIconSize={20}
              customIconComponentStyles={styles.Icon}
              fillColor={Colors.primary}
            />
          );
        } else {
          return (
            <IconComponent
              IconJSX={Outcome}
              customIconSize={20}
              customIconComponentStyles={styles.Icon}
              fillColor={Colors.primary}
            />
          );
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blockedTransactionsFilterActive, isIncome]);

    return (
      <Pressable onPress={handlePress} style={styles.transactionWrapper}>
        <View style={styles.imageContainer}>{transactionIcon}</View>
        <View style={styles.detailsWrapper}>
          <View style={styles.details}>
            <Text
              size={14}
              numberOfLines={1}
              style={styles.description}
              disabled={blockedTransactionsFilterActive}
            >
              {description}
            </Text>
            <Text
              size={14}
              medium
              color={isIncome ? Colors.success : Colors.black700}
              disabled={blockedTransactionsFilterActive}
            >
              {!isIncome && '-'} {CurrencySignMap[currency]}
              {formatMoney(amount)}
            </Text>
          </View>
          <View style={styles.details}>
            <Text />
            <Text
              children={formatDate(docDate)}
              size={12}
              color={Colors.textBlack400}
              disabled={blockedTransactionsFilterActive}
            />
          </View>
          {showUnderline && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
        </View>
      </Pressable>
    );
  },
);

export default LastTransactionItem;
