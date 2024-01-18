import React, { useState, useEffect } from 'react';
import { TextInput, View, SectionList, SectionListRenderItem } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Search } from 'assets/SVGs';
import { Text } from 'components';
import { useStyles } from './MyAccounts.styles';
import { DynamicAccount, LoadingView } from 'components';
import { useTeraTransfers } from './container';
import { TransactionsStackScreenProps, TransactionsStackRouteProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { setAccountFromData } from 'store/slices/transfers';
import { TO_ACCOUNT_SCREEN, OTHER_BANK_TANSACTION_SCREEN } from 'navigation/ScreenNames';
import { useRoute } from '@react-navigation/native';
import { setSelectedIban } from 'store/slices/transfers';

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
  const isFocused = useIsFocused();
  const { params } = useRoute<TransactionsStackRouteProps<'ToAccountScreen'>>();
  const { otherBanks } = params || {};
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const styles = useStyles();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const { groupedAccountsByIban, isLoadingAccounts, refetch } = useTeraTransfers();
  const [sections, setSections] = useState<Section[]>([]);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  useEffect(() => {
    if (groupedAccountsByIban) {
      const formattedSections = groupedAccountsByIban.map(group => {
        const filteredAccounts = group.accounts.filter(account => account.isDebit === true);
        return {
          title: group.accountName,
          data: filteredAccounts,
        };
      });

      setSections(formattedSections);
    }
  }, [groupedAccountsByIban]);

  useEffect(() => {
    if (sections && sections.length > 0) {
      const filtered = sections.filter(section =>
        section.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSections(filtered);
    }
  }, [sections, value]);

  useEffect(() => {
    if (!!selectedAccount && otherBanks) {
      navigate(OTHER_BANK_TANSACTION_SCREEN, { otherBanks: true });
    } else if (!!selectedAccount && !otherBanks) {
      navigate(TO_ACCOUNT_SCREEN, { selected: selectedAccount });
      dispatch(setSelectedIban(selectedAccount));
    }
  }, [navigate, otherBanks, selectedAccount, dispatch]);

  const handleAccountSelection = (accountId: number, item: any) => {
    if (!isLoading) {
      setIsLoading(true);
      setSelectedAccount(prev => (prev !== accountId ? accountId : null));
      dispatch(setAccountFromData(item));

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const renderItem: SectionListRenderItem<any, any> = ({ item, index, section }) => {
    const isNewTitle = index === 0 || item.accountIban === section.accountIban;
    return (
      <>
        {isNewTitle && <Text children={section.title} marginTop={16} />}
        <DynamicAccount
          onPress={() => handleAccountSelection(item.accountId, item)}
          isSelected={selectedAccount === item.accountId}
          data={item}
        />
      </>
    );
  };

  if (isLoadingAccounts) {
    return <LoadingView />;
  }

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
        sections={filteredSections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
