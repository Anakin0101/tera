import React, { FC, useCallback } from 'react';
import { View, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoadingInView, Text } from 'components';
import { formatDate } from 'utils/formatDate';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedTransaction } from 'store/slices/products';
import {
  RenderItem,
  FooterProps,
  KeyExtractor,
  RenderSectionHeader,
  TransactionItem,
} from './AllTransactionsScreen.types';
import { MODAL_STACK, TRANSACTION_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { useStyles } from './AllTransactionsScreen.styles';
import { SPACED_YEAR } from 'constants/DateTemplates';
import LastTransactionItem from 'components/LastTransactions/LastTransactionItem';
import { NoTransactions } from 'components';
import { isTransactionType } from 'utils/transactionUtils/isTransactionType';

export const Sections: FC<FooterProps> = ({
  sections,
  loading,
  blockedTransactionsFilterActive,
}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  //   only navigate to transaction details, if no blocked transactions
  const onTransactionPress = useCallback(
    (item: TransactionItem) => {
      if (isTransactionType(item)) {
        dispatch(setSelectedTransaction(item));
        navigate(MODAL_STACK, {
          screen: TRANSACTION_DETAILS_SCREEN,
        });
      }
    },
    [dispatch, navigate],
  );

  const keyExtractor: KeyExtractor = (item, index) => {
    return `${item.id}-${index}`;
  };

  // reners list item with transaction details
  const renderItem: RenderItem = useCallback(
    ({ item }) => {
      return (
        <View style={styles.itemWrapper}>
          <LastTransactionItem
            item={item}
            onPress={onTransactionPress}
            blockedTransactionsFilterActive={blockedTransactionsFilterActive}
          />
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onTransactionPress, blockedTransactionsFilterActive],
  );

  const renderSectionHeader: RenderSectionHeader = useCallback(
    ({ section }) => {
      return (
        <View style={styles.sectionHeader} key={section.title}>
          <Text children={formatDate(section.title, SPACED_YEAR)} size={16} medium />
        </View>
      );
    },
    [styles.sectionHeader],
  );

  return (
    <View style={styles.sectionListWrapper}>
      {loading && <LoadingInView />}
      {sections && sections.length === 0 && (
        <NoTransactions containerStyle={styles.noTransactionsContainer} />
      )}
      {sections && sections.length > 0 && (
        <SectionList
          sections={sections}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      )}
    </View>
  );
};
