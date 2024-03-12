import React, { useState, useEffect } from 'react';
import { TextInput, View, SectionList, SectionListRenderItem } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Search } from 'assets/SVGs';
import { Text } from 'components';
import { useStyles } from './MyAccounts.styles';
import { DynamicAccount, LoadingView } from 'components';
import { useTeraTransfers } from './container';
import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { setAccountFromData } from 'store/slices/transfers';
import {
  TO_ACCOUNT_SCREEN,
  OTHER_BANK_TANSACTION_SCREEN,
  BUDGET_TRANSACTION_SCREEN,
  MODAL_STACK,
} from 'navigation/ScreenNames';
import { useRoute } from '@react-navigation/native';
import { setSelectedIban } from 'store/slices/transfers';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

interface Section {
  title: string;
  data: AccountData[];
}
interface AccountData {
  accountId: number;
  accountIban: string;
}

export const MyAccounts = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const isFocused = useIsFocused();
  const { params } = useRoute<ModalStackRouteProps<'MyAccountsScreen'>>();
  const { otherBanks, budget } = params || {};
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const styles = useStyles();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const { transferAccounts, isLoadingAccounts, refetch } = useTeraTransfers();
  const [sections, setSections] = useState<Section[]>([]);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  useEffect(() => {
    if (transferAccounts && !budget) {
      const formattedSections = transferAccounts.map(group => {
        const filteredAccounts = group.accounts.filter(account => account.isDebit === true);
        return {
          title: group.accountName,
          data: filteredAccounts,
        };
      });

      setSections(formattedSections);
    } else {
      const formattedSections = transferAccounts.map(group => {
        const filteredAccounts = group.accounts.filter(
          account => account.isDebit === true && account.ccy === CurrencyEnum.GEL,
        );
        return {
          title: group.accountName,
          data: filteredAccounts,
        };
      });

      setSections(formattedSections);
    }
  }, [budget, transferAccounts]);

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
      navigate(MODAL_STACK, {
        screen: OTHER_BANK_TANSACTION_SCREEN,
        params: { otherBanks: true },
      });
    } else if (!!selectedAccount && !otherBanks && !budget) {
      navigate(MODAL_STACK, {
        screen: TO_ACCOUNT_SCREEN,
        params: { selected: selectedAccount },
      });
      dispatch(setSelectedIban(selectedAccount));
    } else if (!!selectedAccount && budget) {
      navigate(MODAL_STACK, {
        screen: BUDGET_TRANSACTION_SCREEN,
        params: { selected: selectedAccount },
      });
    }
  }, [navigate, otherBanks, selectedAccount, budget, dispatch]);

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
