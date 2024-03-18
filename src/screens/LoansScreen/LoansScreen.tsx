import React, { useCallback } from 'react';
import { SectionList } from 'react-native';
import { LoansList } from 'components';
import { useLoans } from './container';
import { Footer } from './Footer';
import { useStyles } from './ LoansScreen.styles';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'loans', data: [{}] },
  { title: 'offers', data: [{}] },
];

export const LoansScreen = () => {
  const styles = useStyles();
  const { totalDebtGEL, allLoans, handleNewLoanPress, creditDisbursements } = useLoans();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'loans':
          return (
            <LoansList
              seeAll
              data={allLoans}
              creditDisbursements={creditDisbursements}
              totalAmount={totalDebtGEL}
            />
          );
        //   case 'offers':
        //     return <Offers data={offers} />;
        default:
          return null;
      }
    },
    [allLoans, creditDisbursements, totalDebtGEL],
  );

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      ListFooterComponent={<Footer onPress={handleNewLoanPress} />}
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};
