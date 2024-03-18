import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TinyChevron } from 'assets/SVGs';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { getCurrencyIcon } from 'utils/currency';
import { formatMoney } from 'utils/formatMoney';
import {
  MODAL_STACK,
  MY_ACCOUNTS_SCREEN,
  OTHER_BANK_TANSACTION_SCREEN,
  TO_ACCOUNT_SCREEN,
} from 'navigation/ScreenNames';

export interface AccountDetails {
  accountIban?: string;
  accountId?: number;
  accountName?: string;
  accountNameCustom?: null | string;
  accountNameLat?: string;
  accountNumber?: number;
  accountStatusId?: number;
  accountSubType?: number | null;
  accountType?: number;
  availableBalance?: number;
  balAcc?: number;
  balance?: number;
  blockedAmount?: number;
  cards?: null;
  ccy?: string;
  isCredit?: boolean;
  isDebit?: boolean;
  isFavourite?: boolean;
  isJuniorAccount?: boolean;
  positionIndex?: number;
  title?: string;
  uiShown?: boolean;
}

export type cardProps = {
  accountFromData: any;
  accountToData: any;
  receiver?: string;
  fromBudget?: boolean;
  fromOtherBanks?: boolean;
  debitResult?: AccountDetails | null;
  creditResult?: AccountDetails | null;
  fromMobile?: boolean;
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
  fromMobile,
}: {
  title: string | undefined;
  balance?: number | string;
  onPress: () => void;
  reverse?: boolean;
  ccy: string;
  fromBudget?: boolean;
  fromMobile?: boolean;
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
            <Text
              children={title}
              style={!fromMobile ? styles.textAccount : styles.textAccountMobile}
              numberOfLines={1}
            />
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
            <Text
              children={title}
              style={fromBudget ? styles.textAccFromBudget : styles.textAccount}
              numberOfLines={1}
            />
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
          {!fromBudget ? (
            <View style={styles.cardContainer}>
              <View style={styles.card} />
            </View>
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
};

export const CardSwap = ({
  accountFromData,
  accountToData,
  receiver,
  fromBudget,
  fromOtherBanks = false,
  debitResult,
  creditResult,
  fromMobile,
}: cardProps) => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );

  const { selectedIban } = selectedItemFromStore;
  const styles = useStyleTheme();
  let receiverName: string = accountToData?.accountName || accountToData?.name || receiver;

  const handlePress = useCallback(
    (arg: number) => {
      if (arg === 1) {
        navigate(MODAL_STACK, {
          screen: MY_ACCOUNTS_SCREEN,
          params: { otherBanks: fromOtherBanks },
        });
      } else {
        if (fromOtherBanks) {
          navigate(MODAL_STACK, {
            screen: OTHER_BANK_TANSACTION_SCREEN,
          });
        } else {
          navigate(MODAL_STACK, {
            screen: TO_ACCOUNT_SCREEN,
            params: { selected: selectedIban },
          });
        }
      }
    },
    [navigate, selectedIban, fromOtherBanks],
  );

  return (
    <View style={styles.cardWrapper}>
      <CardItem
        title={debitResult?.accountName || accountFromData?.accountName}
        balance={
          creditResult
            ? formatMoney(debitResult?.availableBalance)
            : formatMoney(accountFromData?.availableBalance)
        }
        ccy={accountFromData?.ccy}
        onPress={() => handlePress(1)}
        fromMobile={fromMobile}
      />
      <TinyChevron style={styles.chevronIcon} />
      {!fromMobile ? (
        <>
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
        </>
      ) : null}
    </View>
  );
};

export default CardSwap;
