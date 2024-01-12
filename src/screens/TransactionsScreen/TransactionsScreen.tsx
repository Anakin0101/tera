import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { TransferTemplates, ChooseService, LastTransactions, CustomHeader } from 'components';
import { useStyles } from './TransactionsScreen.styles';
import { useTransactionsScreen } from './container';
import { useTranslation } from 'react-i18next';
const sections = [
  { title: 'services', data: [{}] },
  { title: 'templates', data: [{}] },
  { title: 'transfers', data: [{}] },
];

export const TransactionsScreen = () => {
  const styles = useStyles();
  const { templates, temlpatesLoading } = useTransactionsScreen();
  const { t } = useTranslation();

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'services':
        return <ChooseService />;
      case 'templates':
        return (
          <TransferTemplates
            templates={templates?.templates.slice(0, 4)}
            temlpatesLoading={temlpatesLoading}
          />
        );
      case 'transfers':
        return <LastTransactions />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={t('common:navigation.transactions')} />
      <SectionList
        sections={sections}
        renderItem={renderItem}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.sectionListContent}
        style={styles.sectionListStyle}
      />
    </View>
  );
};
