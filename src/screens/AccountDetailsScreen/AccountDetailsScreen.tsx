import React, { useCallback } from 'react';
import { SectionList, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Cards } from './Cards';
import { Details } from './Details';
import { useAccountDetails } from './container';
import { ActiveOverdraft } from './ActiveOverdraft';
import { Slider, LastTransactions, TransparentLoadingView } from 'components';
import { ModalStackRouteProps } from 'navigation/types';
import { useStyles } from './AccountDetailsScreen.styles';
import { AccountSliderItem } from './AccountSliderItem';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'main', data: [{}] },
  { title: 'overdrafts', data: [{}] },
  { title: 'cards', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const AccountDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ModalStackRouteProps<'AccountDetailsScreen'>>();
  const {
    account,
    groupedAccountsByIban,
    actions,
    overdraftRelatedToAcc,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    setActiveIndex,
    setActiveAccountIndex,
    isLoadingFileId,
  } = useAccountDetails(params.iban, params.index);

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'main':
          return (
            <Slider
              data={groupedAccountsByIban}
              renderItem={AccountSliderItem}
              actions={actions}
              index={activeIndex}
              setActiveIndex={setActiveIndex}
              actionButtonsContainer={styles.actionButtons}
              setActiveAccountIndex={setActiveAccountIndex}
            />
          );
        case 'overdrafts':
          return <ActiveOverdraft relatedOverdraft={overdraftRelatedToAcc} />;
        case 'cards':
          return (
            <Cards
              cards={account?.cards}
              isCardAccount={account?.isCardAccount}
              iban={account?.iban}
              fromCardDetails={!!overdraftRelatedToAcc}
            />
          );
        case 'details':
          return (
            <Details
              name={account?.accountName}
              iban={account?.iban}
              displayDivider={!!lastTransactions?.length}
              borderRadius={!account?.isCardAccount && !overdraftRelatedToAcc}
              blockedAmounts={blockedAmounts}
            />
          );
        case 'transactions':
          return (
            <LastTransactions
              data={lastTransactions}
              sectionTitle="products.lastTransactions"
              style={styles.transactionsContainer}
              headerLabelStyle={styles.headerLabelStyle}
              headerContaienrStyle={styles.backgroundWhite}
              accountNumber={account?.accountNumber}
            />
          );
        default:
          return null;
      }
    },
    [
      account,
      actions,
      activeIndex,
      blockedAmounts,
      groupedAccountsByIban,
      lastTransactions,
      overdraftRelatedToAcc,
      setActiveAccountIndex,
      setActiveIndex,
      styles.actionButtons,
      styles.backgroundWhite,
      styles.headerLabelStyle,
      styles.transactionsContainer,
    ],
  );

  if (!account) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SectionList
        bounces={false}
        sections={sections}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.sectionList}
        contentContainerStyle={styles.contentContainer}
      />
      {isLoadingFileId && <TransparentLoadingView />}
    </View>
  );
};
