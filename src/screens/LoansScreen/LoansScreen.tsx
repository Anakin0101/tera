import React, { FC } from 'react';
import { SectionList, View } from 'react-native';
import { Button, DepositsAndLoans } from 'components';
import { Colors } from 'theme/Variables';
import { useLoans } from './container';
import { Plus } from 'assets/SVGs';
import { useStyles } from './ LoansScreen.styles';
import { FooterProps } from './LoanScreen.types';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'loans', data: [{}] },
  { title: 'offers', data: [{}] },
];

const LeftIcon = () => <Plus color={Colors.white} />;

const ListFooter: FC<FooterProps> = ({ onPress, handleActivateLoanPress }) => {
  const styles = useStyles();

  return (
    <View>
      <Button.Primary
        fullWidth
        text="loans.new"
        leftIcon={LeftIcon}
        onPress={onPress}
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
      <Button.Secondary
        fullWidth
        text="სესხის გააქტიურება"
        onPress={handleActivateLoanPress}
        customTextStyle={styles.buttonText}
      />
    </View>
  );
};

export const LoansScreen = () => {
  const styles = useStyles();
  const { totalDebtGEL, data, handleNewLoanPress, handleActivateLoanPress } = useLoans();

  const renderItem: SectionListRenderItemT = ({ section }) => {
    switch (section.title) {
      case 'loans':
        return <DepositsAndLoans seeAll data={data} variant="loan" totalAmount={totalDebtGEL} />;
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
      ListFooterComponent={
        <ListFooter
          onPress={handleNewLoanPress}
          handleActivateLoanPress={handleActivateLoanPress}
        />
      }
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};
