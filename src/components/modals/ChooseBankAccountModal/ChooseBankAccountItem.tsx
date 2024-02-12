import React, { FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { useStyles } from './ChooseBankAccountModal.styles';
import { CheckCircle } from 'assets/SVGs';
import { BankAccountItemProps, ChooseBankAccountItemProps } from './ChooseBankAccountModal.types';
import { formatMoney } from 'utils/formatMoney';
import { getCurrencyIcon } from 'utils/currency';
import { maskAccountIban } from 'utils/maskAccountIban';

/**
 * Individual bank account item for the ChooseBankAccountList.
 *
 * @param {object} props - The properties of the BankAccountItem component.
 * @param {BankAccountItemProps} props.account - The bank account information.
 * @param {boolean} props.isLast - Indicates whether it's the last account in the list.
 * @param {IGroupedAccountsByIban} props.selectedAccount - The currently selected bank account.
 * @param {function} props.selectAccountOnPress - Callback function when an account is pressed.
 *
 * @returns {JSX.Element} The rendered BankAccountItem component.
 */
const BankAccountItem: FC<BankAccountItemProps> = memo(
  ({ account, isLast = false, selectedAccount, selectAccountOnPress }) => {
    const styles = useStyles();

    return (
      <Pressable onPress={() => selectAccountOnPress(account)} style={styles.accountWrapper}>
        <View style={styles.cardWapper}>
          <View style={styles.card} />
        </View>
        <View style={styles.accountContentWrapper}>
          <View style={styles.accountContent}>
            <View>
              <Text style={styles.accountIban}>{maskAccountIban(account.accountIban)}</Text>
              <Text style={styles.moneyLabel}>
                {`${formatMoney(account?.availableBalance)} ${getCurrencyIcon(account?.ccy)}`}
              </Text>
            </View>
            {selectedAccount?.accountId === account.accountId && (
              <View style={styles.selectedWrapper}>
                <CheckCircle />
              </View>
            )}
          </View>
          {!isLast && <Divider height={1} marginTop={16} />}
        </View>
      </Pressable>
    );
  },
);

/**
 * Component representing a bank account and its details in the ChooseBankAccountList.
 *
 * @param {object} props - The properties of the ChooseBankAccountItem component.
 * @param {IGroupedAccountsByIban} props.item - The grouped account information.
 * @param {IGroupedAccountsByIban} props.selectedAccount - The currently selected bank account.
 * @param {function} props.selectAccountOnPress - Callback function when an account is pressed.
 *
 * @returns {JSX.Element} The rendered ChooseBankAccountItem component.
 */
export const ChooseBankAccountItem: FC<ChooseBankAccountItemProps> = memo(
  ({ item, selectedAccount, selectAccountOnPress }) => {
    const styles = useStyles();

    return (
      <View style={styles.itemWrapper}>
        <Text style={styles.accountName}>{item.accountName}</Text>
        {item?.accounts?.map((account, index) => (
          <BankAccountItem
            key={index.toString()}
            account={account}
            isLast={item?.accounts?.length === index + 1}
            selectedAccount={selectedAccount}
            selectAccountOnPress={selectAccountOnPress}
          />
        ))}
        <Divider height={1} />
      </View>
    );
  },
);
