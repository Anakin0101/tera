import { View } from 'react-native';
import React from 'react';
import { TextInput, Text, Button } from 'components';
import { ScrollView } from 'react-native-gesture-handler';
import { useStyles } from './PersonalNumberTransaction.styles';

const PersonalNumberTransaction = () => {
  const styles = useStyles();
  //   const {
  //     templates,
  //     temlpatesLoading,
  //     selectedData,
  //     setSelectedData,
  //     typedAccountName,
  //     setTypedAccountName,
  //     debouncedAccountName,
  //     setDebouncedAccountName,
  //     previousAccountName,
  //     setPreviousAccountName,
  //     invoiceFile,
  //     handleFilePick,
  //     apiCallInitiated,
  //     setApiCallInitiated,
  //     INPUT_LENGTH,
  //   } = useTransactionsScreen();

  //   const selectTemplate = useCallback(
  //     (iban: any) => {
  //       setSelectedData(iban);
  //       setTypedAccountName(iban);
  //       handleCheckIban(iban);
  //       setApiCallInitiated(true);
  //       dispatch(setAccountToData({ iban: iban.toUpperCase() }));
  //     },
  //     [setSelectedData, setTypedAccountName, handleCheckIban, setApiCallInitiated, dispatch],
  //   );

  const navigateToTransferScreen = () => {
    // if (isSuccess) {
    //   navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
    //     fromOtherBank: true,
    //   });
    // }
  };

  return (
    <ScrollView style={styles.scroll}>
      <Text children="მიმღების დეტალები" size={18} demiBold />
      <>
        <TextInput
          inputStyle={styles.inputStyle}
          label="მიმღების ანგარიში"
          maxLength={22}
          marginTop={32}
          autoFocus
        />
        <View style={styles.template}>
          {/* <TransferTemplates
            fromOtherBanks
            setTypedAccountName={setTypedAccountName}
            selectedData={selectedData}
            setSelectedData={selectTemplate}
            templates={templates?.templates.slice(0, 4)}
            temlpatesLoading={temlpatesLoading}
          /> */}
        </View>
      </>
      <View>
        <Button.Primary text="შემდეგი" onPress={navigateToTransferScreen} />
      </View>
    </ScrollView>
  );
};

export default PersonalNumberTransaction;
