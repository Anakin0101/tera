import React, { FC, useCallback } from 'react';
import { View, SectionList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components';
import { formatDate } from 'utils/formatDate';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedTransaction } from 'store/slices/products';
import LastTransactionItem from 'components/LastTransactions/LastTransactionItem';
import {
  RenderItem,
  FooterProps,
  KeyExtractor,
  RenderSectionHeader,
} from './AllTransactionsScreen.types';
import { MODAL_STACK, TRANSACTION_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { TransactionType } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './AllTransactionsScreen.styles';
import { SPACED_YEAR } from 'constants/DateTemplates';

export const Sections: FC<FooterProps> = ({ sections }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const onTransactionPress = useCallback(
    (item: TransactionType) => {
      dispatch(setSelectedTransaction(item));
      navigate(MODAL_STACK, {
        screen: TRANSACTION_DETAILS_SCREEN,
      });
    },
    [dispatch, navigate],
  );

  const renderItem: RenderItem = useCallback(
    ({ item }) => {
      return (
        <View style={styles.itemWrapper}>
          <LastTransactionItem item={item} onPress={onTransactionPress} />
        </View>
      );
    },
    [onTransactionPress, styles.itemWrapper],
  );

  const renderSectionHeader: RenderSectionHeader = useCallback(
    ({ section }) => {
      return (
        <View style={styles.sectionHeader}>
          <Text children={formatDate(section.title, SPACED_YEAR)} size={16} medium />
        </View>
      );
    },
    [styles.sectionHeader],
  );

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
