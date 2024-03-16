import React, { useCallback } from 'react';
import { SectionList, View } from 'react-native';
import { Details } from '../AccountDetailsScreen/Details';
import { Slider, LastTransactions, Wallet, TransparentLoadingView } from 'components';
import { useStyles } from './CardDetailsScreen.styles';
import { CardHolderDetails } from './CardHolderDetails';
import { useCardDetails } from './container';
import { TemporarilyInactiveDetails } from '../AccountDetailsScreen/TemporarilyInactiveDetails';
import { CardSliderItem } from './CardSliderItem';
import { SectionListRenderItemT } from 'screens/types';
import { CardStatusCode } from 'services/apis/productsAPI/productsAPI.types';

const sections = [
  { title: 'main', data: [{}] },
  { title: 'wallet', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'information', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const CardDetailsScreen = () => {
  const styles = useStyles();
  const {
    actions,
    activeAccountCards,
    activeCard,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    setActiveIndex,
    iban,
    isLoading,
    changingPin,
  } = useCardDetails();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      if (
        activeCard?.status === CardStatusCode.TemporarilyInactive &&
        section.title !== 'main' &&
        section.title !== 'details'
      ) {
        return null;
      }
      switch (section.title) {
        case 'main':
          return (
            <Slider
              data={activeAccountCards}
              renderItem={CardSliderItem}
              actions={actions}
              index={activeIndex}
              setActiveIndex={setActiveIndex}
              actionButtonsContainer={styles.actionButtons}
            />
          );
        case 'wallet':
          return <Wallet />;
        case 'details':
          if (activeCard?.status !== CardStatusCode.TemporarilyInactive) {
            return (
              <CardHolderDetails
                accountNumber={activeCard?.pan}
                endDate={activeCard?.endDate}
                cvv={String(activeCard?.priority)}
              />
            );
          } else {
            return (
              <TemporarilyInactiveDetails
                cardHolder={activeCard.cardHolder}
                name={activeCard?.cardProductName}
                insure="products.insure"
                displayDivider={!!lastTransactions?.length}
                blockedAmounts={blockedAmounts}
              />
            );
          }
        case 'information':
          return (
            <Details
              cardHolder={activeCard.cardHolder}
              name={activeCard?.cardProductName}
              insure="products.insure"
              displayDivider={!!lastTransactions?.length}
              blockedAmounts={blockedAmounts}
              iban={iban}
              style={!lastTransactions?.length && styles.padding}
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
            />
          );
        default:
          return null;
      }
    },
    [
      iban,
      actions,
      activeAccountCards,
      activeCard,
      activeIndex,
      blockedAmounts,
      lastTransactions,
      setActiveIndex,
      styles.actionButtons,
      styles.backgroundWhite,
      styles.headerLabelStyle,
      styles.padding,
      styles.transactionsContainer,
    ],
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      {changingPin && isLoading && <TransparentLoadingView />}
    </View>
  );
};
