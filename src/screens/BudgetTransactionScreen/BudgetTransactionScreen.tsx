import React, { useState, useEffect } from 'react';
import { SectionList, SectionListRenderItem } from 'react-native';
import { Button } from 'components';
import { useStyles } from './BudgetTransactionScreen.styles';
import { Budget } from 'components/Budget/Budget';
import { useBudget } from './container';
import { treasuryRes } from 'services/apis/transfersAPI/transfersAPI.types';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { TRANSFER_TO_BUDGET } from 'navigation/ScreenNames';
import { setClearTreasuryFromCode, setClearWrappedCode } from 'store/slices/transfers';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
const sections = [{ title: 'budget', data: [{}] }];

const ListFooter = (treasury: treasuryRes, clickedCreateCode: boolean) => {
  const styles = useStyles();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'BudgetTransactionScreen'>>();

  const navigateToTransferBudget = () => {
    if (treasury || clickedCreateCode) {
      navigate(TRANSFER_TO_BUDGET);
    }
  };

  return (
    <Button.Primary
      fullWidth
      disabled={!treasury && !clickedCreateCode}
      onPress={navigateToTransferBudget}
      text="transactions.next"
      customWrapperStyle={styles.button}
      customTextStyle={styles.buttonText}
    />
  );
};

export const BudgetTransactionScreen = () => {
  const { budgetCode, onChangeBudgetCode, treasury } = useBudget(false);
  const [clickedCreateCode, setClickedCreateCode] = useState(false);
  const dispatch = useAppDispatch();
  const styles = useStyles();

  useEffect(() => {
    return () => {
      dispatch(setClearWrappedCode());
      dispatch(setClearTreasuryFromCode());
    };
  }, [dispatch]);

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'budget':
        return (
          <Budget
            budgetCode={budgetCode}
            onChangeBudgetCode={onChangeBudgetCode}
            setClickedCreateCode={setClickedCreateCode}
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
      ListFooterComponent={() => ListFooter(treasury, clickedCreateCode)}
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};
