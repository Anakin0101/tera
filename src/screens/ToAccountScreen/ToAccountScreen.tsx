import React, { useState, useEffect } from 'react';
import { TextInput, View, SectionList, SectionListRenderItem } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search } from 'assets/SVGs';
import { Text, LoadingView } from 'components';
import { useStyles } from './ToAccountScreen.styles';
import { DynamicAccount } from 'components';
import { useAccounts } from 'hooks';
import { useRoute } from '@react-navigation/native';
import { TransactionsStackRouteProps } from 'navigation/types';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { setAccountToData } from 'store/slices/transfers';
import { TRANSFER_TO_ACCOUNT_SCREEN } from 'navigation/ScreenNames';

interface Section {
  title: string;
  data: AccountData[];
}
interface AccountData {
  accountId: number;
  accountIban: string;
}

export const ToAccountScreen = () => {
  const { params } = useRoute<TransactionsStackRouteProps<'ToAccountScreen'>>();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferToAccountScreen'>>();
  const isFocused = useIsFocused();
  const { selected } = params;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const styles = useStyles();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const { transferAccounts, isLoadingAccounts, refetch } = useAccounts();
  const [sections, setSections] = useState<Section[]>([]);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  useEffect(() => {
    if (selectedAccount !== null) {
      navigate(TRANSFER_TO_ACCOUNT_SCREEN, { fromOtherBank: false });
    }
  }, [navigate, selectedAccount]);

  useEffect(() => {
    if (sections && sections.length > 0) {
      const filtered = sections.filter(section =>
        section.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSections(filtered);
    }
  }, [sections, value]);

  useEffect(() => {
    if (transferAccounts) {
      const filteredAccounts = transferAccounts.map(group => {
        return {
          title: group.accountName,
          data: group.accounts.filter(
            account => account.isCredit && account.accountId !== selected,
          ),
        };
      });
      setSections(filteredAccounts);
    }
  }, [transferAccounts, selected]);

  const handleAccountSelection = (accountId: number, item: any) => {
    if (!isLoading) {
      setIsLoading(true);
      setSelectedAccount(prev => (prev !== accountId ? accountId : null));
      dispatch(setAccountToData(item));

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
          maxFontSizeMultiplier={1}
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
