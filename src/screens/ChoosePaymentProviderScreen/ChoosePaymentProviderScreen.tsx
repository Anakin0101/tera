import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ChooseProviderItem, SearchComponent, Text } from 'components/index';
import { useStyles } from './ChoosePaymentProviderScreen.style';
import { Provider } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { MainStackRouteProps } from 'navigation/types';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';

export const ChoosePaymentProviderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { setOptions } = useNavigation();
  const { params } = useRoute<MainStackRouteProps<'ChoosePaymentProviderScreen'>>();
  const { providerInfo, isAutomaticPayment } = params || {};
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const [searchText, setSearchText] = useState<string>('');

  const headerTitle = useMemo(() => {
    // Initialize title with an empty string
    let title = '';
    // Check if the selected language is 'geo'
    if (savedLanguage === LanguageKeys.geo) {
      // Use the Georgian name if available, otherwise use an empty string
      title = providerInfo?.name?.ka || '';
    } else {
      // Use the English name if available, otherwise use an empty string
      title = providerInfo?.name?.en || '';
    }
    // Return the calculated title
    return title;
  }, [providerInfo?.name?.en, providerInfo?.name?.ka, savedLanguage]);

  useLayoutEffect(() => {
    setOptions({
      title: headerTitle,
    });
  }, [setOptions, headerTitle]);

  // local search
  const providersList = useMemo(() => {
    // Initialize providerList with the list of providers from providerInfo or an empty array
    let providerList = [];
    if (isAutomaticPayment) {
      providerList = providerInfo?.providers?.filter(item => item.directDebitType !== 3);
    } else {
      providerList = providerInfo?.providers;
    }

    try {
      // Check if searchText is provided and the selected language is 'geo'
      if (searchText && savedLanguage === LanguageKeys.geo) {
        // Filter providers based on the Georgian name (name.ka)
        providerList = providerList.filter(item =>
          item?.name?.ka?.toLowerCase().includes(searchText.toLowerCase()),
        );
      } else if (searchText && savedLanguage === LanguageKeys.en) {
        // Filter providers based on the English name (name.en)
        providerList = providerList.filter(item =>
          item?.name?.en?.toLowerCase().includes(searchText.toLowerCase()),
        );
      }
    } catch (e) {
      console.warn('Error in providersList filter', e);
    }
    // Return the filtered providerList
    return providerList;
  }, [isAutomaticPayment, providerInfo?.providers, savedLanguage, searchText]);

  const renderItem = useCallback(
    ({ item, index }: { item: Provider; index: number }) => {
      return (
        <ChooseProviderItem
          isLast={index === providersList?.length - 1}
          item={item}
          isAutomaticPayment={isAutomaticPayment}
        />
      );
    },
    [isAutomaticPayment, providersList?.length],
  );

  const renderHeader = useCallback(() => {
    return (
      <View>
        <Text style={styles.headerTitle}>{t('newPayment.chooseService')}</Text>
      </View>
    );
  }, [styles.headerTitle, t]);

  return (
    <View style={styles.container}>
      <SearchComponent
        placeholder={t('newPayment.searchPlaceholder')}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={providersList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listWrapper}
      />
    </View>
  );
};
