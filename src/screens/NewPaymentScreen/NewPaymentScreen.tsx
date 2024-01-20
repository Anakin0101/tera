import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './NewPaymentScreen.style';
import { useTranslation } from 'react-i18next';
import { SearchComponent } from 'components/index';

const data = [{ id: '0' }];
export const NewPaymentScreen = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');

  const renderItem = useCallback(() => {
    return <View></View>;
  }, []);

  return (
    <View style={styles.container}>
      <SearchComponent
        placeholder={t('newPayment.searchPlaceholder')}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      />
    </View>
  );
};
