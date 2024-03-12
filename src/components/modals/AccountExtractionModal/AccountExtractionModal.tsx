import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { Footer } from './Footer';
import { Header } from './Header';
import { formatDate } from 'utils/formatDate';
import { LoadingInView, Text } from 'components';
import { EmptyComponent } from './EmptyComponent';
import { useAccountExtraction } from './container';
import { SPACED_YEAR } from 'constants/DateTemplates';
import { CollapsibleAccounts } from './CollapsibleAccounts';
import LastTransactionItem from 'components/LastTransactions/LastTransactionItem';
import {
  RenderItem,
  KeyExtractor,
  RenderSectionHeader,
  AccountExtractionModalProps,
} from './AccountExtractionModal.types';
import { useStyles } from './AccountExtractionModal.styles';

export const AccountExtractionModal: FC<AccountExtractionModalProps> = ({
  selectedAccountFromCard,
  accounts,
}) => {
  const styles = useStyles();
  const {
    isLoadingOps,
    sections,
    isDisabledDownload,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedTemplateId,
    setSelectedTemplateId,
    fileFormat,
    setFileFormat,
    selectedAccount,
    setSelectedAccount,
    downloadStatement,
  } = useAccountExtraction(selectedAccountFromCard);

  const renderItem: RenderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemWrapper}>
        <LastTransactionItem item={item} onPress={() => {}} />
      </View>
    ),
    [styles.itemWrapper],
  );

  const renderSectionHeader: RenderSectionHeader = useCallback(
    ({ section }) => (
      <View style={styles.sectionHeader}>
        <Text children={formatDate(section.title, SPACED_YEAR)} size={16} medium />
      </View>
    ),
    [styles.sectionHeader],
  );

  const keyExtractor: KeyExtractor = useCallback(item => String(item.id), []);

  return (
    <View style={styles.main}>
      <CollapsibleAccounts
        accounts={accounts}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
      />
      {isLoadingOps ? (
        <LoadingInView />
      ) : (
        <BottomSheetSectionList
          sections={sections}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={EmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Header
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
              endDate={endDate}
              selectedTemplateId={selectedTemplateId}
              setSelectedTemplateId={setSelectedTemplateId}
            />
          }
        />
      )}
      <Footer
        fileFormat={fileFormat}
        setFileFormat={setFileFormat}
        downloadStatement={downloadStatement}
        isDisabledDownload={isDisabledDownload}
      />
    </View>
  );
};
