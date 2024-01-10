import React, { useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { Button, Text } from 'components/index';
import { useStyleTheme } from './TransactionFinishedScreen.styles';
import { Calendar, Plus, Share, SuccessTransaction } from 'assets/SVGs';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { ChooseService } from 'components/index';
import { TRANSACTIONS_SCREEN } from 'navigation/ScreenNames';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedData } from 'store/slices/transfers';
import { TransactionsStackRouteProps } from 'navigation/types';
import { useRoute } from '@react-navigation/native';
import { getCurrencyIcon } from 'utils/currency';
interface SelectedItem {
  selectedPrice: any;
  convertionData: any;
  accountFromData: any;
  accountToData: any;
}

export const TransactionFinishedScreen = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<TransactionsStackRouteProps<'TransferDetailScreen'>>();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );
  const { accountFromData, accountToData, selectedPrice, convertionData } = selectedItemFromStore;

  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransactionsScreen'>>();
  const navigateToMain = () => {
    navigate(TRANSACTIONS_SCREEN);
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(setSelectedData(''));
  }, [dispatch]);

  const data = [
    {
      name: 'transfers.saveAsTemplate',
      icon: <Plus />,
    },
    {
      name: 'transfers.automatic',
      icon: <Calendar />,
    },
    {
      name: 'transfers.shareCheck',
      icon: <Share />,
    },
  ];
  const styles = useStyleTheme();
  return (
    <>
      <View style={styles.wrapper}>
        <SuccessTransaction />
        <View style={styles.textWrapper}>
          <Text children="transfers.success" style={styles.text} numberOfLines={2} />
          {!params.convertion ? (
            <Text
              children={`თანხა :${selectedPrice} ${getCurrencyIcon(accountFromData.ccy)}`}
              style={styles.amount}
            />
          ) : (
            <Text
              children={`გადარიცხული თანხა ${convertionData.buyAmount.amountBuy} ${getCurrencyIcon(
                accountFromData.ccy,
              )} = ${convertionData.buyAmount.amountSell} ${getCurrencyIcon(accountToData.ccy)}`}
              style={styles.amount}
            />
          )}

          <View style={styles.btnWrapper}>
            <ChooseService fromTransaction serviceData={data} />
            <Button.Primary text="მთავარზე დაბრუნება" onPress={navigateToMain} />
          </View>
        </View>
      </View>
    </>
  );
};
