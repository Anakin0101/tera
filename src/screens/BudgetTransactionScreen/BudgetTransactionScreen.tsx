import React, { useState, useEffect } from 'react';
import { SectionList } from 'react-native';
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
import { SectionListRenderItemT } from 'screens/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SelectedItem } from 'components/OtherBanksTransactionTabBar/OtherBanksTransactionTabBar.types';
import { wrappedCodeTypes } from './BudgetTransactionScreen.types';
import { LoadingView } from 'components';
import { REGEX } from 'constants/index';
const sections = [{ title: 'budget', data: [{}] }];

const ListFooter = (
  treasury: treasuryRes,
  clickedCreateCode: boolean,
  wrappedCode: wrappedCodeTypes,
  budgetCode: string,
) => {
  const styles = useStyles();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'BudgetTransactionScreen'>>();

  const navigateToTransferBudget = () => {
    const isValidBudgetCode = REGEX.BUDGET.test(budgetCode);
    if (!clickedCreateCode && isValidBudgetCode) {
      navigate(TRANSFER_TO_BUDGET, { budgetCode: budgetCode });
    } else if (clickedCreateCode && (treasury || clickedCreateCode)) {
      navigate(TRANSFER_TO_BUDGET, { treasury: wrappedCode });
    }
  };

  return (
    <Button.Primary
      fullWidth
      // disabled={!treasury && !clickedCreateCode}
      onPress={navigateToTransferBudget}
      text="transactions.next"
      customWrapperStyle={styles.button}
      customTextStyle={styles.buttonText}
    />
  );
};

export const BudgetTransactionScreen = () => {
  const { budgetCode, onChangeBudgetCode, treasury, isLoading } = useBudget(false);
  const [clickedCreateCode, setClickedCreateCode] = useState(false);
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );

  const { wrappedCode } = selectedItemFromStore;
  const dispatch = useAppDispatch();
  const styles = useStyles();

  useEffect(() => {
    return () => {
      dispatch(setClearWrappedCode());
      dispatch(setClearTreasuryFromCode());
    };
  }, [dispatch]);

  const renderItem: SectionListRenderItemT = ({ section }) => {
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
  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      ListFooterComponent={() => ListFooter(treasury, clickedCreateCode, wrappedCode, budgetCode)}
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};
