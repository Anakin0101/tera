import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import { Button, OTPModal } from 'components';
import {
  useLazyGetFileByIdQuery,
  useAddOrUpdateTeraWalletMutation,
  useGenerateTeraWalletPdfMutation,
} from 'services/apis/productsAPI/productsAPI';
import { BASE_URL } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { closeModal, openModal } from 'utils/modal';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ProductsStackScreenProps } from 'navigation/types';
import { useStyles } from './TeraWalletScreen.styles';

export const TeraWalletPDFScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'TeraWalletSuccessScreen'>>();
  const { accountId, amountId, currency } = useAppSelector(state => state.teraWallet);
  const [generateWalletPdf, { data: pdf }] = useGenerateTeraWalletPdfMutation();
  const [addOrUpdateTeraWallet] = useAddOrUpdateTeraWalletMutation();
  const [getFileById] = useLazyGetFileByIdQuery();

  useEffect(() => {
    if (accountId && typeof amountId === 'number') {
      generateWalletPdf({
        accountId,
        amountId,
      });
    }
  }, [accountId, amountId, generateWalletPdf, getFileById]);

  const handleNextPress = () => {
    if (!(accountId && typeof amountId === 'number')) {
      return;
    }

    addOrUpdateTeraWallet({
      sendOtp: true,
    });

    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code === '000000') {
              addOrUpdateTeraWallet({
                culture: 'ka',
                ccy: currency,
                amountId,
                accountId,
                sendOtp: false,
                otp: code,
                fileId: pdf,
                teraWalletId: 0,
                disableWallet: false,
              })
                .unwrap()
                .then(() => {
                  closeModal();
                  navigate('TeraWalletSuccessScreen');
                });
            }
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  };

  return (
    <View style={styles.pdfContainer}>
      {pdf ? (
        <Pdf source={{ uri: `${BASE_URL}Files/GetFileById?fileId=${pdf}` }} style={styles.pdf} />
      ) : (
        <Loader />
      )}
      <View style={styles.buttonContainer}>
        <Button.Primary
          fullWidth
          text="common.next"
          customWrapperStyle={styles.button}
          onPress={handleNextPress}
        />
      </View>
    </View>
  );
};
