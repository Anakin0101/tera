import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import { Button, LoadingView, OTPModal } from 'components';
import {
  useAddOrUpdateTeraWalletMutation,
  useGenerateTeraWalletPdfMutation,
} from 'services/apis/productsAPI/productsAPI';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { closeModal, openModal } from 'utils/modal';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ProductsStackScreenProps } from 'navigation/types';
import { useStyles } from './TeraWalletScreen.styles';
import { TERA_WALLET_SUCCESS_SCREEN } from 'navigation/ScreenNames';

export const TeraWalletPDFScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'TeraWalletSuccessScreen'>>();
  const { accountId, amountId, currency } = useAppSelector(state => state.teraWallet);
  const [generateWalletPdf, { data: pdf }] = useGenerateTeraWalletPdfMutation();
  const [addOrUpdateTeraWallet] = useAddOrUpdateTeraWalletMutation();

  useEffect(() => {
    if (accountId && typeof amountId === 'number') {
      generateWalletPdf({
        accountId,
        amountId,
      });
    }
  }, [accountId, amountId, generateWalletPdf]);

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
                ccy: currency,
                amountId,
                accountId,
                otp: code,
                fileId: pdf,
              })
                .unwrap()
                .then(() => {
                  closeModal();
                  navigate(TERA_WALLET_SUCCESS_SCREEN);
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
        <Pdf
          trustAllCerts={false}
          source={{ uri: `${PUBLIC_IMAGE_URL}${pdf}` }}
          style={styles.pdf}
        />
      ) : (
        <LoadingView />
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
