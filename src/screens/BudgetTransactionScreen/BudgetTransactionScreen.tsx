import React from 'react';
import { SectionList, SectionListRenderItem } from 'react-native';
import { Button } from 'components';
import { useStyles } from './BudgetTransactionScreen.styles';
import { Budget } from 'components/Budget/Budget';
import { useBudget } from './container';
import { treasuryRes } from 'services/apis/transfersAPI/transfersAPI.types';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { TRANSFER_TO_BUDGET } from 'navigation/ScreenNames';

const sections = [{ title: 'budget', data: [{}] }];

const ListFooter = (treasury: treasuryRes) => {
  const styles = useStyles();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'BudgetTransactionScreen'>>();

  const navigateToTransferBudget = () => {
    navigate(TRANSFER_TO_BUDGET);
  };

  return (
    <Button.Primary
      fullWidth
      disabled={!treasury}
      onPress={navigateToTransferBudget}
      text="transactions.next"
      customWrapperStyle={styles.button}
      customTextStyle={styles.buttonText}
    />
  );
};

export const BudgetTransactionScreen = () => {
  const { budgetCode, onChangeBudgetCode, treasury } = useBudget();
  const styles = useStyles();

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'budget':
        return (
          <Budget
            budgetCode={budgetCode}
            onChangeBudgetCode={onChangeBudgetCode}
            treasury={treasury}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      ListFooterComponent={() => ListFooter(treasury)}
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};
