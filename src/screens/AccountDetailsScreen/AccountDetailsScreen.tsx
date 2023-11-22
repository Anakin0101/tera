import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Cards } from './Cards';
import { Details } from './Details';
import { useAccountDetails } from './container';
import { ActiveOverdraft } from './ActiveOverdraft';
import { Slider, LastTransactions } from 'components';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './AccountDetailsScreen.styles';
import { AccountSliderItem } from './AccountSliderItem';

const sections = [
  { title: 'main', data: [{}] },
  { title: 'overdrafts', data: [{}] },
  { title: 'cards', data: [{}] },
  { title: 'details', data: [{}] },
  { title: 'transactions', data: [{}] },
];

export const AccountDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'AccountDetailsScreen'>>();
  const {
    account,
    groupedAccountsByIban,
    actions,
    overdraftRelatedToAcc,
    groupedCardsByPan,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    setActiveIndex,
  } = useAccountDetails(params.iban, params.index);

  if (!account) {
    return null;
  }

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'main':
        return (
          <Slider
            data={groupedAccountsByIban}
            renderItem={AccountSliderItem}
            actions={actions}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 'overdrafts':
        return <ActiveOverdraft relatedOverdraft={overdraftRelatedToAcc} />;
      case 'cards':
        return (
          <Cards
            cards={groupedCardsByPan}
            isCardAccount={account.isCardAccount}
            iban={account.iban}
            fromCardDetails={!!overdraftRelatedToAcc}
          />
        );
      case 'details':
        return (
          <Details
            name={account?.accountName}
            iban={account.iban}
            displayDivider={!!lastTransactions?.length}
            borderRadius={!account.isCardAccount && !overdraftRelatedToAcc}
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
          />
        );
      default:
        return null;
    }
  };

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
    </View>
  );
};
