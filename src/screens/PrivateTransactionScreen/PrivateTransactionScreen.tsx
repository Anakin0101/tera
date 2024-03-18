import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'components';
import { useStyles } from './PrivateTransactionScreen.styles';
import { TextInput } from 'components';
import { useDispatch } from 'react-redux';
import { setSelectedData } from 'store/slices/transfers';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import { TransactionType } from 'utils/transactionUtils';
import { useAppSelector } from 'store/hooks/useAppSelector';
export const PrivateTransactionScreen = () => {
  const { t } = useTranslation();
  const { params } = useRoute<ModalStackRouteProps<'PrivateTransactionScreen'>>();
  const { setOptions } = useNavigation<ModalStackScreenProps<'PrivateTransactionScreen'>>();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: { selectedData: string } }) => state.transfers.selectedData,
  );
  useEffect(() => {
    setTextInputValue(selectedItemFromStore || '');
  }, [selectedItemFromStore]);

  useLayoutEffect(() => {
    if (params.from === TransactionType.CONVERTION) {
      setOptions({
        title: t('transfers.convertion'),
      });
    } else if (params.from === TransactionType.TRANSFER) {
      setOptions({
        title: t('transfers.toOwnAccount'),
      });
    } else if (params.from === TransactionType.BUDGET) {
      setOptions({
        title: t('transactions.inBudget'),
      });
    } else {
      setOptions({
        title: t('transfers.toOther'),
      });
    }
  }, [params, setOptions, t]);

  const { goBack } = useNavigation();
  const styles = useStyles();
  const dispatch = useDispatch();

  const [textInputValue, setTextInputValue] = useState<string>('');

  const handleSaveOtherValue = () => {
    dispatch(setSelectedData(textInputValue));
    goBack();
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.textInputWrapperStyle}>
          <TextInput
            label="transfers.destination"
            value={textInputValue}
            marginTop={32}
            autoFocus
            onChangeText={text => setTextInputValue(text)}
          />
          <View style={styles.buttonWrapperStyle}>
            <Button.Primary fixedWidth text="loanRequest.save" onPress={handleSaveOtherValue} />
          </View>
        </View>
      </View>
    </View>
  );
};
