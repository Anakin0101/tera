import { View } from 'react-native';
import React, { useState } from 'react';
import { Text, DetailsItem, Button } from 'components';
import { TextInput } from 'components';
import { useStyles } from './ForeignIbanScreen.styles';
import { useForeignIban } from './container';
import { useTranslation } from 'react-i18next';
import AutocompleteInput from 'components/AutoCompleteInput/AutocompleteInput';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { TransactionsStackRouteProps, TransactionsStackScreenProps } from 'navigation/types';
import { setForeignIbanData } from 'store/slices/transfers';
import { useKeyboard } from 'utils/useKeyboard';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { TRANSFER_TO_FOREIGN_IBAN } from 'navigation/ScreenNames';
const ForeignIbanScreen = () => {
  const { params } = useRoute<TransactionsStackRouteProps<'ForeignIbanScreen'>>();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'ForeignIbanScreen'>>();
  const { t } = useTranslation();
  const { isKeyboardOpened } = useKeyboard();
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { checkForeignIban } = useForeignIban();

  const [receiverName, setReceiverName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const [bankDetails, setBankDetails] = useState({ bankName: '', bankCode: '' });

  const clearSelection = () => {
    setBankDetails({
      bankName: '',
      bankCode: '',
    });
  };

  const navigateToTransferScreen = () => {
    dispatch(
      setForeignIbanData({
        receiverIban: params.iban,
        ccy: params.ccy,
        receiverName,
        country,
        city,
        address,
      }),
    );
    navigate(TRANSFER_TO_FOREIGN_IBAN);
  };
  const handleSuggestionSelected = (suggestion: any, isFromBankNameInput: boolean) => {
    if (isFromBankNameInput) {
      setBankDetails({ bankName: suggestion.bankName, bankCode: suggestion.bankCode });
    } else {
      setBankDetails({ bankName: suggestion.bankName, bankCode: suggestion.bankCode });
    }

    dispatch(
      setForeignIbanData({
        bankerCodeOrName: {
          bankCode: suggestion.bankCode,
          bankName: suggestion.bankName,
        },
      }),
    );
  };

  const fetchSuggestions = async (query: any) => {
    try {
      const response = await checkForeignIban(query);
      return response;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };
  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={isKeyboardOpened}
      containerStyle={styles.keyboardContainer}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary
            text="personalNumber.next"
            fullWidth
            hitSlop={15}
            onPress={navigateToTransferScreen}
          />
        </View>
      }
    >
      <View>
        <Text children="personalNumber.Iban" size={18} demiBold />
        <>
          <DetailsItem label="transactionDetails.receiverIban" value={params.iban} marginTop={20} />
          <TextInput
            inputStyle={styles.inputStyle}
            label="transactionDetails.receiver"
            value={receiverName}
            onChangeText={setReceiverName}
            marginTop={10}
          />
          <TextInput
            inputStyle={styles.inputStyle}
            label="transactionDetails.country"
            value={country}
            onChangeText={setCountry}
            marginTop={10}
          />
          <TextInput
            inputStyle={styles.inputStyle}
            label="transactionDetails.city"
            value={city}
            onChangeText={setCity}
            marginTop={10}
          />
          <TextInput
            inputStyle={styles.inputStyle}
            label="transactionDetails.address"
            value={address}
            onChangeText={setAddress}
            marginTop={10}
          />
          <AutocompleteInput
            label={t('transactionDetails.foreignCode')}
            fetchSuggestions={fetchSuggestions}
            onSuggestionSelected={(item: any) => handleSuggestionSelected(item, false)}
            style={styles.autocompleteContainer}
            value={bankDetails?.bankCode}
            clearOnSelect={clearSelection}
            isBankNameInput={false}
          />
          <AutocompleteInput
            label={t('transactionDetails.mediatorBankCode')}
            fetchSuggestions={fetchSuggestions}
            onSuggestionSelected={(item: any) => handleSuggestionSelected(item, true)}
            style={styles.autocompleteContainer}
            value={bankDetails.bankName}
            clearOnSelect={clearSelection}
            isBankNameInput={true}
          />
        </>
      </View>
    </KeyboardAvoidingScrollView>
  );
};

export default ForeignIbanScreen;
