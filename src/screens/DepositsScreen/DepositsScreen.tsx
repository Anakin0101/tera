import React, { useCallback } from 'react';
import { SectionList } from 'react-native';
import { DepositsList, LoadingInView, Offers } from 'components';
import { useDepositsScreen } from './container';
import { useStyles } from './DepositsScreen.styles';
import { SectionListRenderItemT } from 'screens/types';
import { ListFooter } from './Footer';

const sections = [
  { title: 'deposits', data: [{}] },
  { title: 'offers', data: [{}] },
];

export const DepositsScreen = () => {
  const styles = useStyles();
  const { deposits, totalDepositsGEL, handleNewDepositPress, banners, bannersLoading } =
    useDepositsScreen();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'deposits':
          return (
            <DepositsList
              seeAll
              data={deposits}
              totalAmount={totalDepositsGEL}
              displayDivider={!!banners?.length}
            />
          );
        case 'offers':
          return <Offers data={banners} showAll={false} />;
        default:
          return null;
      }
    },
    [banners, deposits, totalDepositsGEL],
  );

  if (bannersLoading) {
    return <LoadingInView />;
  }

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      ListFooterComponent={<ListFooter onPress={handleNewDepositPress} />}
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};
