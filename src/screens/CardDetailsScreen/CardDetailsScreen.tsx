import React, { useCallback } from 'react';
import { SectionList, View } from 'react-native';
import { Slider, LastTransactions, Wallet, TransparentLoadingView } from 'components';
import { CardHolderDetails } from './CardHolderDetails';
import { useCardDetails } from './container';
import { CardSliderItem } from './CardSliderItem';
import { CardInformation } from './CardInformation';
import { SectionListRenderItemT } from 'screens/types';
import { useStyles } from './CardDetailsScreen.styles';

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
    isLoading,
    changingPin,
    insurancePackage,
  } = useCardDetails();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'main':
          return (
            <Slider
              data={activeAccountCards}
              renderItem={CardSliderItem}
              actions={actions}
              index={activeIndex}
              setActiveIndex={setActiveIndex}
              actionButtonsContainer={
                actions?.length > 3 ? styles.actionButtons : styles.spaceEvenly
              }
            />
          );
        case 'wallet':
          return <Wallet />;
        case 'details':
          return <CardHolderDetails pan={activeCard?.pan} endDate={activeCard?.endDate} />;
        case 'information':
          return (
            <CardInformation
              name={activeCard.cardProductName}
              cardHolder={activeCard.cardHolder}
              blockedAmounts={blockedAmounts}
              insurance={insurancePackage}
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
      actions,
      activeAccountCards,
      activeCard,
      activeIndex,
      blockedAmounts,
      lastTransactions,
      setActiveIndex,
      insurancePackage,
      styles.actionButtons,
      styles.backgroundWhite,
      styles.headerLabelStyle,
      styles.spaceEvenly,
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
