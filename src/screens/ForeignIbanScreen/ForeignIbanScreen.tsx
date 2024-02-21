// import { View, Image, ScrollView, Pressable } from 'react-native';
// import React, { useEffect, useCallback, useMemo, useState } from 'react';
// import { Text } from 'components';
// import { Button, TextInput, TransferTemplates, LoadingView } from 'components';
// import { useOtherBanksContainer } from 'screens/OtherBanksTransactionScreen/container';
// import { DetailsItem } from 'components/DetailsItem/DetailsItem';
// import { useNavigation } from '@react-navigation/native';
// import { TransactionsStackScreenProps } from 'navigation/types';
// import { TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN } from 'navigation/ScreenNames';
// import { useTransactionsScreen } from 'screens/TransactionsScreen/container';
// import { useAppDispatch } from 'store/hooks/useAppDispatch';
// import { setAccountToData, setReceiverInfo } from 'store/slices/transfers';
// import { useStyles } from './ForeignIbanScreen.styles';
// import { TransactionModal } from 'components/modals';
// import { openModal } from 'utils/modal';
// import { SelectedItem } from 'components/OtherBanksTransactionTabBar/OtherBanksTransactionTabBar.types';
// import { useAppSelector } from 'store/hooks/useAppSelector';
// import { ChevronDown } from 'assets/SVGs';
// import { Colors } from 'theme/Variables';
// import useBankIcons from './useIban';
// import { IBAN } from 'constants/transactionConstants';
// import { ibanRegex } from 'constants/transactionConstants';
// import { Error } from 'assets/SVGs';
// import { openToast } from 'utils/toast';
// import { useTranslation } from 'react-i18next';
// import { TERRA_BANK_CODE } from 'constants/BankCodes';
// import { useForeignIban } from './container';
// // import { useCopyToClipboard } from 'hooks';
// import AutocompleteInput from 'components/AutoCompleteInput/AutocompleteInput';
// const ForeignIbanScreen = () => {
//   const dispatch = useAppDispatch();
//   const { t } = useTranslation();
//   const styles = useStyles();
//   const { checkForeignIban } = useForeignIban();

//   const handleSuggestionSelected = suggestion => {
//     // Implement what happens when a suggestion is selected
//     console.log('Selected suggestion:', suggestion);
//   };
//   // Function to fetch suggestions, which calls the API and returns the results
//   const fetchSuggestions = async query => {
//     try {
//       const response = await checkForeignIban(query);
//       return response; // You will need to adjust this according to the actual API response structure
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       return []; // Return an empty array in case of an error
//     }
//   };
//   return (
//     <View style={styles.scroll}>
//       <View style={{ paddingVertical: 10 }}>
//         <Text children="personalNumber.Iban" size={18} demiBold />
//         <>
//           <AutocompleteInput
//             label="Bank Name"
//             fetchSuggestions={fetchSuggestions}
//             onSuggestionSelected={handleSuggestionSelected}
//             style={styles.autocompleteContainer}
//           />
//           <TextInput
//             inputStyle={styles.inputStyle}
//             label="transactionDetails.receiver"
//             value="asdasd"
//             //   onChangeText={text => hendleRecieverName(text)}
//             marginTop={32}
//             autoFocus
//           />
//           <TextInput
//             inputStyle={styles.inputStyle}
//             label="transactionDetails.receiver"
//             value="asdasd"
//             //   onChangeText={text => hendleRecieverName(text)}
//             marginTop={32}
//             autoFocus
//           />
//           <TextInput
//             inputStyle={styles.inputStyle}
//             label="transactionDetails.receiver"
//             value="asdasd"
//             //   onChangeText={text => hendleRecieverName(text)}
//             marginTop={32}
//             autoFocus
//           />
//           <TextInput
//             inputStyle={styles.inputStyle}
//             label="transactionDetails.receiver"
//             value="asdasd"
//             //   onChangeText={text => hendleRecieverName(text)}
//             marginTop={32}
//             autoFocus
//           />
//           <TextInput
//             inputStyle={styles.inputStyle}
//             label="transactionDetails.receiver"
//             value="asdasd"
//             //   onChangeText={text => hendleRecieverName(text)}
//             marginTop={32}
//             autoFocus
//           />
//           <TextInput
//             inputStyle={styles.inputStyle}
//             label="transactionDetails.receiver"
//             value="asdasd"
//             //   onChangeText={text => hendleRecieverName(text)}
//             marginTop={32}
//             autoFocus
//           />
//           <TextInput
//             inputStyle={styles.inputStyle}
//             label="transactionDetails.receiver"
//             value="asdasd"
//             //   onChangeText={text => hendleRecieverName(text)}
//             marginTop={32}
//             autoFocus
//           />
//         </>
//       </View>
//     </View>
//   );
// };

// export default ForeignIbanScreen;
