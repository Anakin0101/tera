import React, { FC, useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, SafeAreaView, View } from 'react-native';
import { SearchComponent, Text } from 'components';
import { useStyles } from './ChooseBankAccountModal.styles';
import { ChooseBankAccountModalProps } from './ChooseBankAccountModal.types';
import { HeaderBackArrow } from 'components/index';
import { useTranslation } from 'react-i18next';
import { useChooseBankAccount } from './container';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { ChooseBankAccountItem } from './ChooseBankAccountItem';
import { LoadingInView } from 'components/LoadingView/LoadingInView';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const ChooseBankAccountModal: FC<ChooseBankAccountModalProps> = ({
  confirm = () => {},
  cancel = () => {},
  modalVisible = false,
  selectedAccount,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { groupedAccountsByIban, isLoading } = useChooseBankAccount();
  const [searchText, setSearchText] = useState<string>('');

  /**
   * Render a bank account item for the ChooseBankAccountList.
   *
   * @param {object} params - The parameters for rendering the item.
   * @param {IGroupedAccountsByIban} params.item - The grouped account information.
   *
   * @returns {JSX.Element} The rendered ChooseBankAccountItem component.
   */
  const renderItem = useCallback(
    ({ item }: { item: IGroupedAccountsByIban }) => {
      return (
        <ChooseBankAccountItem
          item={item}
          selectedAccount={selectedAccount}
          selectAccountOnPress={confirm}
        />
      );
    },
    [selectedAccount, confirm],
  );

  /**
   * Filters only gel account
   */
  const getAccounts = useMemo(() => {
    return groupedAccountsByIban.map(group => ({
      ...group,
      accounts: group.accounts.filter(account => account.ccy === CurrencyEnum.GEL),
    }));
  }, [groupedAccountsByIban]);

  // local search
  const groupedAccountsByIbanList = useMemo(() => {
    let ibanList = getAccounts || [];
    try {
      if (searchText) {
        // Filter providers based on the Georgian name (name.ka)
        ibanList = ibanList.filter(item =>
          item?.accountName.toLowerCase().includes(searchText.toLowerCase()),
        );
      }
    } catch (e) {
      console.warn('Error in groupedAccountsByIbanList filter', e);
    }
    // Return the filtered ibanList
    return ibanList;
  }, [getAccounts, searchText]);

  /**
   * Render the content based on the loading state and grouped accounts.
   *
   * @param {boolean} props.isLoading - Indicates whether data is currently being loaded.
   * @param {IGroupedAccountsByIban[]} props.groupedAccountsByIban - The grouped accounts to display.
   * @param {function} props.renderItem - Function to render individual items in the FlatList.
   *
   * @returns {JSX.Element} The rendered content based on the loading state and grouped accounts.
   */
  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loadingWrapper}>
          <LoadingInView />
        </View>
      );
    } else {
      return (
        <FlatList
          data={groupedAccountsByIbanList}
          keyExtractor={(item, index) => item.iban + index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listWrapper}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }, [groupedAccountsByIbanList, isLoading, renderItem, styles.listWrapper, styles.loadingWrapper]);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={cancel}>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <HeaderBackArrow onPress={cancel} />
            <View style={styles.titleWrapper}>
              <Text
                children={t('checkPaymentProvider.fromWhere')}
                style={styles.headerTitleStyle}
              />
            </View>
          </View>
        </SafeAreaView>
        <SearchComponent
          placeholder={t('checkPaymentProvider.searchAccount')}
          value={searchText}
          onChangeText={setSearchText}
        />
        {renderContent()}
      </View>
    </Modal>
  );
};
