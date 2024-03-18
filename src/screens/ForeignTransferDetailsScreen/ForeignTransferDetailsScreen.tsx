import React from 'react';
import { View, ScrollView } from 'react-native';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { maskIban } from 'utils/maskIban';
import { useStyleTheme } from './ForeignTransferDetailsScreen.styles';
import { BlockedAmount } from 'screens/AccountDetailsScreen/AccountDetailsScreen.types';
import { SelectedItem } from './ForeignTransferDetailsScreen.types';
import { formatToTwoDecimalPlaces } from 'utils/formatToDecimal';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { IconComponent, Text, Button } from 'components/index';
import { useTranslation } from 'react-i18next';
import Images from 'theme/Images';
import { getCurrencyIcon } from 'utils/currency';
import { useForeignTransfer } from './container';
import { FinancialTransferTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { openToast } from 'utils/toast';
import { useTransferToSomeoneMutation } from 'services/apis';
import { TreasuryApiResponse } from './ForeignTransferDetailsScreen.types';
import { OTPModal } from 'components/index';
import { openModal } from 'utils/modal';
import { TransferToSomeoneResultResponseType } from 'services/apis/transfersAPI/transfersAPI.types';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { TRANSACTION_FINISHED_SCREEN } from 'navigation/ScreenNames';

export const ForeignTransferDetailsScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<ModalStackScreenProps<'TransactionFinishedScreen'>>();
  const { handleTransferInfo, isGetTransferInfoLoading } = useForeignTransfer();
  const [transferToSomeoneMutation] = useTransferToSomeoneMutation();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );
  const { accountFromData, selectedPrice, selectedTransactionType, foreignIbanData } =
    selectedItemFromStore;

  const { receiverIban, receiverName, country, city, selectedBankCode, selectedBankName } =
    foreignIbanData;

  const transferWithOtp = async (formData: any, code: string) => {
    let headers: { [key: string]: string } = {
      'X-Bank-Isstrongauthrequest': 'true',
      'Content-Type': 'multipart/form-data',
      ...(code !== undefined && { 'X-Bank-Otp': code }),
    };
    const transferToSomeoneResult: TransferToSomeoneResultResponseType =
      await transferToSomeoneMutation({
        headers: headers,
        body: formData,
      });
    if (transferToSomeoneResult) {
      navigate(TRANSACTION_FINISHED_SCREEN, { fromIban: true });
    }
  };

  const handleButtonPress = async () => {
    const ForeignTransferData = {
      debitAccountId: accountFromData.accountId,
      receiverIban: receiverIban,
      amount: selectedPrice,
      receiverName: receiverName,
      purpose: 'adasdasdasd',
      extraPurpose: '',
      otp: '',
      fastPayment: selectedTransactionType.isFast,
      bankCode: selectedBankCode,
      bankName: selectedBankName,
      saveAsTemplateName: '',
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(ForeignTransferData)) {
      formData.append(key, value);
    }

    const checkTransfer = await handleTransferInfo({
      transferType: FinancialTransferTypeEnum.ToSomeoneOutOfGeorgia,
      debitAccountId: accountFromData.accountId,
      amount: selectedPrice,
      fastPayment: false,
      ensured: false,
      receiverBankCode: null,
    });

    if (checkTransfer?.isSuccess) {
      const response: TreasuryApiResponse = await transferToSomeoneMutation({
        headers: {
          'X-Bank-Isstrongauthrequest': 'true',
          'X-Bank-Getauthmethod': 'true',
        },
        body: formData,
      });
      if (response?.data?.otpRequired) {
        openModal({
          element: <OTPModal onFinished={code => transferWithOtp(formData, code)} />,
        });
      } else {
        navigate(TRANSACTION_FINISHED_SCREEN, { fromIban: true });
      }
    } else {
      openToast(`${t('transfers.balanceAvailable')}`, 'error');
      return;
    }
  };

  const styles = useStyleTheme();

  const renderDetailsItem = (
    label: string,
    value: string | BlockedAmount[] | undefined,
    iban?: string,
  ) => {
    const displayValue = iban ? maskIban(iban) : undefined;
    return <DetailsItem label={label} value={value} iban={displayValue} />;
  };

  const renderTransferDetails = () => {
    return (
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        <View style={styles.wrapperCard}>
          <View style={styles.card}>
            <IconComponent
              pngLocalIcon={Images().LiabilitiesIcon}
              customIconComponentStyles={styles.customIconComponentStyles}
            />
            <View>
              <Text children="ტერაში გადარიცხვა" style={styles.textLabel} />
              <Text
                children={`${formatToTwoDecimalPlaces(selectedPrice)} ${getCurrencyIcon(
                  accountFromData?.ccy,
                )}`}
                style={styles.text}
              />
            </View>
          </View>
          <View style={styles.backgroundWhite}>
            <View style={styles.detailsSectionWrapper}>
              {renderDetailsItem(
                'transfers.fromWhere',
                `${accountFromData.accountName} `,
                accountFromData.accountIban,
              )}
              {renderDetailsItem('personalNumber.RecepientIban', maskIban(receiverIban))}
              {renderDetailsItem(
                'transactionDetails.amount',
                `${formatToTwoDecimalPlaces(selectedPrice)} ₾`,
              )}
              {renderDetailsItem('მიმღები', receiverName)}
              {renderDetailsItem('მიმღების რეზიდენტობის ქვეყანა', country)}
              {renderDetailsItem('მიმღები ბანკი', selectedBankName)}
              {renderDetailsItem('შუამავალი ბანკი', selectedBankCode)}
              {renderDetailsItem('ქალაქი', city)}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary
            text={t('transfers.transfer')}
            hitSlop={15}
            fixedWidth
            onPress={() => {
              handleButtonPress();
            }}
            isLoading={isGetTransferInfoLoading}
          />
        </View>
      </ScrollView>
    );
  };

  return renderTransferDetails();
};
