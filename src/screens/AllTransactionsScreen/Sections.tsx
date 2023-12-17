import React, { FC } from 'react';
import { View, SectionList, ActivityIndicator, SectionListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components';
import { formatDate } from 'utils/formatDate';
import LastTransactionItem from 'components/LastTransactions/LastTransactionItem';
import {
  ISections,
  FooterProps,
  KeyExtractor,
  RenderSectionHeader,
} from './AllTransactionsScreen.types';
import { MainStackScreenProps } from 'navigation/types';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './AllTransactionsScreen.styles';

export const Sections: FC<FooterProps> = ({ sections }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'TransactionDetailsScreen'>>();

  const onTransactionPress = () => {
    navigate('TransactionDetailsScreen');
  };

  const renderItem: SectionListRenderItem<TransactionType, ISections> = ({ item }) => {
    return (
      <View style={styles.itemWrapper}>
        <LastTransactionItem item={item} onPress={onTransactionPress} />
      </View>
    );
  };

  const renderSectionHeader: RenderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text children={formatDate(section.title, ' YYYY')} size={16} medium />
      </View>
    );
  };

  const keyExtractor: KeyExtractor = item => String(item.id);

  return (
    <View style={styles.sectionListWrapper}>
      {sections ? (
        <SectionList
          sections={sections}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      ) : (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};
