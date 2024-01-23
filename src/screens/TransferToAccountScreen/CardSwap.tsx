import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TinyChevron } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { getCurrencyIcon } from 'utils/currency';
import { formatMoney } from 'utils/formatMoney';
import { MY_ACCOUNTS_SCREEN, TO_ACCOUNT_SCREEN } from 'navigation/ScreenNames';

export type cardProps = {
  accountFromData: any;
  accountToData: any;
  receiver?: string;
  fromBudget?: boolean;
};
interface SelectedItem {
  selectedIban: number | null;
}
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

export const CardSwap = ({ accountFromData, accountToData, receiver, fromBudget }: cardProps) => {
  const { navigate } = useNavigation<TransactionsStackScreenProps<'ToAccountScreen'>>();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );

  const { selectedIban } = selectedItemFromStore;
  const styles = useStyleTheme();
  let receiverName: string = accountToData?.accountName || accountToData?.name || receiver;

  const handlePress = useCallback(
    (arg: number) => {
      if (arg === 1) {
        navigate(MY_ACCOUNTS_SCREEN, {});
      } else {
        navigate(TO_ACCOUNT_SCREEN, { selected: selectedIban });
      }
    },
    [navigate, selectedIban],
  );

  return (
    <View style={styles.cardWrapper}>
      <CardItem
        title={accountFromData?.accountName}
        balance={formatMoney(accountFromData?.availableBalance)}
        ccy={accountFromData?.ccy}
        onPress={() => handlePress(1)}
      />
      <TinyChevron style={styles.chevronIcon} />
      <CardItem
        reverse
        fromBudget={fromBudget}
        title={receiverName}
        balance={
          accountToData?.availableBalance || accountToData?.availableBalance === 0
            ? formatMoney(accountToData?.availableBalance)
            : accountToData?.iban
            ? accountToData?.iban
            : accountToData?.accountIban
        }
        ccy={accountToData?.ccy}
        onPress={() => handlePress(2)}
      />
    </View>
  );
};

export default CardSwap;
