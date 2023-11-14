import React from 'react';
import { SectionList, SectionListRenderItem } from 'react-native';
import { Button, CardsAndAccounts, Offers } from 'components';
import { useStyles } from './AllAcountsAndCardsScreen.styles';
import { Plus } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { useAllAcounts } from './container';

const sections = [
  { title: 'accounts', data: [{}] },
  { title: 'offers', data: [{}] },
];

const LeftIcon = () => <Plus color={Colors.white} />;

const ListFooter = () => {
  const styles = useStyles();
  return (
    <Button.Primary
      fullWidth
      text="products.newAccount"
      customWrapperStyle={styles.button}
      leftIcon={LeftIcon}
    />
  );
};

export const AllAcountsAndCardsScreen = () => {
  const styles = useStyles();
  const { groupedAccountsByIban, totalAvailableBalanceGEL, offers } = useAllAcounts();

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'accounts':
        return (
          <CardsAndAccounts
            accounts={groupedAccountsByIban}
            showTitle={false}
            showFooter={false}
            showDivider={!!offers?.length}
            totalAvailableBalance={totalAvailableBalanceGEL}
            seeAllAccounts
          />
        );
      case 'offers':
        return <Offers data={offers} />;
      default:
        return null;
    }
  };

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      ListFooterComponent={ListFooter}
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AllAcountsAndCardsScreen;
