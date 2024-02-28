import React, { FC, useCallback } from 'react';
import { SectionList } from 'react-native';
import { Button, DepositsAndLoans, LoadingInView, Offers } from 'components';
import { useDepositsScreen } from './container';
import { Plus } from 'assets/SVGs';
import { useStyles } from './DepositsScreen.styles';
import { Colors } from 'theme/Variables';
import { FooterProps } from './DepositScreen.types';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'deposits', data: [{}] },
  { title: 'offers', data: [{}] },
];

const LeftIcon = () => <Plus color={Colors.white} />;

const ListFooter: FC<FooterProps> = ({ onPress }) => {
  const styles = useStyles();

  return (
    <Button.Primary
      fullWidth
      text="products.newDeposit"
      customWrapperStyle={styles.button}
      customTextStyle={styles.buttonText}
      leftIcon={LeftIcon}
      onPress={onPress}
    />
  );
};

export const DepositsScreen = () => {
  const styles = useStyles();
  const { deposits, totalDepositsGEL, handleNewDepositPress, banners, bannersLoading } =
    useDepositsScreen();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'deposits':
          return (
            <DepositsAndLoans
              seeAll
              data={deposits}
              variant="deposit"
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
