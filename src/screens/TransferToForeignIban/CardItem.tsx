import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToForeignIban.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCurrencyIcon } from 'utils/currency';
const CardItem = ({
  title,
  balance,
  onPress,
  reverse,
  ccy,
  fromBudget,
}: {
  title: string | undefined;
  balance?: number | string;
  onPress: () => void;
  reverse?: boolean;
  ccy: string;
  fromBudget?: boolean;
}) => {
  const styles = useStyleTheme();

  return (
    <TouchableOpacity style={styles.buttonCard} onPress={onPress}>
      {!reverse ? (
        <>
          <View style={styles.cardContainer}>
            <View style={styles.card} />
          </View>
          <View style={styles.wrapCard}>
            <Text children={title} style={styles.textAccount} numberOfLines={1} />
            <Text
              children={`${balance} ${getCurrencyIcon(ccy)}`}
              style={styles.textLine}
              numberOfLines={1}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.wrapCard}>
            <Text children={title} style={styles.textAccount} numberOfLines={1} />
            {fromBudget ? (
              <Text children={balance} style={styles.textLine} numberOfLines={1} />
            ) : (
              <Text
                children={`${balance} ${getCurrencyIcon(ccy)}`}
                style={styles.textLine}
                numberOfLines={1}
              />
            )}
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
export default CardItem;
