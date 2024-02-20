import React, { FC, memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from 'hooks';
import { Divider, IconComponent, Text } from '../index';
import { formatDate } from 'utils/formatDate';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { LastTransactionProps } from './LastTransaction.types';
import { useStyles } from './LastTransactions.styles';
import Images from 'theme/Images';

const LastTransactionItem: FC<LastTransactionProps> = memo(
  ({ item, onPress, showUnderline = true }) => {
    const styles = useStyles();
    const { Colors } = useTheme();

    const handlePress = useCallback(() => {
      onPress(item);
    }, [item, onPress]);

    return (
      <Pressable onPress={handlePress} style={styles.transactionWrapper}>
        <View style={styles.imageContainer}>
          <IconComponent
            pngLocalIcon={item.isIncome ? Images().IncomeIcon : Images().PayOutIcon}
            customIconComponentStyles={styles.Icon}
          />
        </View>
        <View style={styles.detailsWrapper}>
          <View style={styles.details}>
            <Text size={14} numberOfLines={1} style={styles.description}>
              {item.description}
            </Text>
            <Text size={14} medium color={item.isIncome ? Colors.success : Colors.black700}>
              {!item.isIncome && '-'} {CurrencySignMap[item.currency]}
              {formatMoney(item.amount)}
            </Text>
          </View>
          <View style={styles.details}>
            <Text children="" size={12} color={Colors.textBlack400} />
            <Text children={formatDate(item.docDate)} size={12} color={Colors.textBlack400} />
          </View>
          {showUnderline && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
        </View>
      </Pressable>
    );
  },
);

export default LastTransactionItem;
