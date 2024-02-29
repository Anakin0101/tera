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
import { setSelectedData, clearCurrentTransfer } from 'store/slices/transfers';
import { TransactionsStackRouteProps } from 'navigation/types';
import { useRoute } from '@react-navigation/native';
import { getCurrencyIcon } from 'utils/currency';
import { useTranslation } from 'react-i18next';
import { formatToTwoDecimalPlaces } from 'utils/formatToDecimal';

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
  const { t } = useTranslation();

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

  useEffect(() => {
    return () => {
      dispatch(clearCurrentTransfer());
    };
  }, [dispatch]);

  const data = [
    {
      name: 'transfers.saveAsTemplate',
      icon: <Plus />,
    },
    ...(!params?.mobileTransaction && !params?.budgetTransaction
      ? [
          {
            name: 'transfers.automatic',
            icon: <Calendar />,
          },
        ]
      : []),
    {
      name: 'transfers.shareCheck',
      icon: <Share />,
    },
  ];
  const styles = useStyleTheme();

  return (
    <View style={styles.wrapper}>
      <SuccessTransaction width={88} height={88} />
      <View style={styles.textWrapper}>
        <Text
          children={params?.mobileTransaction ? 'transfers.task' : 'transfers.success'}
          style={styles.text}
          numberOfLines={2}
        />
        {!params?.convertion ? (
          <Text
            children={`${t('transactions.transAmount')}: ${formatToTwoDecimalPlaces(
              selectedPrice,
            )} ${getCurrencyIcon(accountFromData?.ccy)}`}
            style={styles.amount}
          />
        ) : (
          <Text
            children={`${t('transactions.transAmount')} ${
              convertionData.buyAmount.amountBuy
            } ${getCurrencyIcon(accountFromData.ccy)} = ${
              convertionData.buyAmount.amountSell
            } ${getCurrencyIcon(accountToData.ccy)}`}
            style={styles.amount}
          />
        )}

        <View style={styles.btnWrapper}>
          <ChooseService fromTransaction serviceData={data} transferParams={params} />
          <Button.Primary hitSlop={15} text={t('transfers.backToHome')} onPress={navigateToMain} />
        </View>
      </View>
    </View>
  );
};
