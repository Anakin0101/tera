import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './MyBalance.styles';
import { Text } from 'components/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'assets/SVGs';
import { MyBalanceProps } from './MyBalance.types';
import { ChooseBankAccountModal } from 'components/modals';
import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { formatMoney } from 'utils/formatMoney';
import { getCurrencyIcon } from 'utils/currency';

export const MyBalance: React.FC<MyBalanceProps> = ({ selectedAccount, selectAccountOnPress }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const [showBankAccounts, setShowBankAccounts] = useState<boolean>(false);

  const showChooseBackAccount = () => {
    setShowBankAccounts(true);
  };

  const confirmOnPress = useCallback(
    (account: Account) => {
      setShowBankAccounts(false);
      selectAccountOnPress(account);
    },
    [selectAccountOnPress],
  );

  return (
    <View>
      <Pressable style={styles.wrapper} onPress={showChooseBackAccount}>
        <View style={styles.container}>
          <View style={styles.cardWrapper}>
            <View style={styles.card} />
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.title}>{t('checkPaymentProvider.myFinancial')}</Text>
            <Text style={styles.desc}>
              {selectedAccount
                ? `${formatMoney(selectedAccount?.availableBalance)} ${getCurrencyIcon(
                    selectedAccount?.ccy,
                  )}`
                : t('checkPaymentProvider.chooseAccount')}
            </Text>
          </View>
        </View>
        <View style={styles.arrowStyle}>
          <ArrowDown width={24} height={14} />
        </View>
      </Pressable>
      {showBankAccounts && (
        <ChooseBankAccountModal
          modalVisible={showBankAccounts}
          selectedAccount={selectedAccount}
          cancel={() => setShowBankAccounts(false)}
          confirm={confirmOnPress}
        />
      )}
    </View>
  );
};
