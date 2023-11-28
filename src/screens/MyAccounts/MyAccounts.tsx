import React, { useState, useEffect } from 'react';
import { TextInput, View, SectionList, SectionListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Search } from 'assets/SVGs';
import { Text } from 'components';
import { useStyles } from './MyAccounts.styles';
import { DynamicAccount } from 'components';
import { useTeraTransfers } from './container';
import { TransactionsStackScreenProps } from 'navigation/types';
interface Section {
  title: string;
  data: AccountData[];
}
interface AccountData {
  accountId: number;
  accountIban: string;
}

export const MyAccounts = () => {
  const { navigate } = useNavigation<TransactionsStackScreenProps<'ToAccountScreen'>>();
  const { t } = useTranslation();
  const styles = useStyles();
  const [value, setValue] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const { groupedAccountsByIban } = useTeraTransfers();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (groupedAccountsByIban) {
      const formattedSections = groupedAccountsByIban.map(group => {
        return {
          title: group.accountName,
          data: group.accounts,
        };
      });
      setSections(formattedSections);
    }
  }, [groupedAccountsByIban]);
  useEffect(() => {
    if (selectedAccount !== null) {
      navigate('ToAccountScreen', { selected: selectedAccount });
    }
  }, [navigate, selectedAccount]);

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
