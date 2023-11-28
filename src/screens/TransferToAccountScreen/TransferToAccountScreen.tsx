import React, { useState, useEffect } from 'react';
import { TextInput, View, SectionList, SectionListRenderItem } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search } from 'assets/SVGs';
import { Text } from 'components';
import { useStyles } from './TransferToAccount.styles';
import { DynamicAccount } from 'components';
import { useTeraProducts } from 'screens/ProductsScreen/teraProductsContainer';
import { useRoute } from '@react-navigation/native';
import { TransactionsStackRouteProps } from 'navigation/types';
interface Section {
  title: string;
  data: AccountData[];
}
interface AccountData {
  accountId: number;
  accountIban: string;
}

export const TransferToAccountScreen = () => {
  const { params } = useRoute<TransactionsStackRouteProps<'TransferToAccountScreen'>>();
  const { selected } = params;

  const { t } = useTranslation();
  const styles = useStyles();
  const [value, setValue] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const { groupedAccountsByIban } = useTeraProducts();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (groupedAccountsByIban) {
      const filteredAccounts = groupedAccountsByIban.map(group => {
        return {
          title: group.accountName,
          data: group.accounts.filter(account => account.accountId !== selected),
        };
      });
      setSections(filteredAccounts);
    }
  }, [groupedAccountsByIban, selected]);

  const handleAccountSelection = (accountId: number) => {
    setSelectedAccount(prev => (prev !== accountId ? accountId : null));
  };

  const renderItem: SectionListRenderItem<any, any> = ({ item, index, section }) => {
    const isNewTitle = index === 0 || item.accountIban === section.accountIban;
    return (
      <>
        {isNewTitle && <Text children={section.title} marginTop={16} />}
        <DynamicAccount
          onPress={() => handleAccountSelection(item.accountId)}
          isSelected={selectedAccount === item.accountId}
          data={item}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Search />
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholder={t('transfers.search')}
        />
      </View>

      <SectionList
        sections={sections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
