import React from 'react';
import { SectionList, SectionListRenderItem } from 'react-native';
import { Button, DepositsAndLoans } from 'components';
import { Colors } from 'theme/Variables';
import { useLoans } from './container';
import { Plus } from 'assets/SVGs';
import { useStyles } from './ LoansScreen.styles';

const sections = [
  { title: 'loans', data: [{}] },
  { title: 'offers', data: [{}] },
];

const LeftIcon = () => <Plus color={Colors.white} />;

const ListFooter = () => {
  const styles = useStyles();

  return (
    <Button.Primary
      fullWidth
      text="loans.new"
      leftIcon={LeftIcon}
      customWrapperStyle={styles.button}
      customTextStyle={styles.buttonText}
    />
  );
};

export const LoansScreen = () => {
  const styles = useStyles();
  const { loans, totalDebtGEL } = useLoans();

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'loans':
        return (
          <DepositsAndLoans seeAll data={loans} variant="deposit" totalAmount={totalDebtGEL} />
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
