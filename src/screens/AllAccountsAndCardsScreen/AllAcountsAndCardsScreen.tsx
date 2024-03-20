import React, { useCallback } from 'react';
import { SectionList } from 'react-native';
import { CardsAndAccounts, Offers } from 'components';
import { useAllAcounts } from './container';
import { ListFooter } from './Footer';
import { LoadingInView } from 'components/LoadingView/LoadingInView';
import { SectionListRenderItemT } from 'screens/types';
import { useStyles } from './AllAcountsAndCardsScreen.styles';

const sections = [
  { title: 'accounts', data: [{}] },
  { title: 'offers', data: [{}] },
];

export const AllAcountsAndCardsScreen = () => {
  const styles = useStyles();
  const { groupedAccountsByIban, groupedUserBalance, banners, bannersLoading } = useAllAcounts();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'accounts':
          return (
            <CardsAndAccounts
              accounts={groupedAccountsByIban}
              showTitle={false}
              showFooter={false}
              showDivider={!!banners?.length}
              groupedUserBalance={groupedUserBalance}
              seeAllAccounts
            />
          );
        case 'offers':
          return <Offers data={banners} showAll={false} />;
        default:
          return null;
      }
    },
    [banners, groupedAccountsByIban, groupedUserBalance],
  );

  if (bannersLoading) {
    return <LoadingInView />;
  }

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
