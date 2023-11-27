import React from 'react';
import { SectionList, SectionListRenderItem } from 'react-native';
import {
  Button,
  DepositsAndLoans,
  //  Offers
} from 'components';
import { useDepositsScreen } from './container';
import { Plus } from 'assets/SVGs';
import { useStyles } from './DepositsScreen.styles';
import { Colors } from 'theme/Variables';

const sections = [
  { title: 'deposits', data: [{}] },
  { title: 'offers', data: [{}] },
];

const LeftIcon = () => <Plus color={Colors.white} />;

const ListFooter = () => {
  const styles = useStyles();

  return (
    <Button.Primary
      fullWidth
      text="products.newDeposit"
      customWrapperStyle={styles.button}
      customTextStyle={styles.buttonText}
      leftIcon={LeftIcon}
    />
  );
};

export const DepositsScreen = () => {
  const styles = useStyles();
  const { deposits, totalDepositsGEL } = useDepositsScreen();

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'deposits':
        return (
          <DepositsAndLoans
            seeAll
            data={deposits}
            variant="deposit"
            totalAmount={totalDepositsGEL}
          />
        );
      //   case 'offers':
      //     return <Offers data={offers} />;
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
