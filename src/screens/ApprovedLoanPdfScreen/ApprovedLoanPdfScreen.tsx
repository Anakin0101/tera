import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';
import {
  Button,
  Checkbox,
  LoadingInView,
  // LoadingView
} from 'components';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { useStyles } from './ApprovedLoanPdfScreen.styles';
import { useApproveLoanPdf } from './container';

export const ApprovedLoanPdfScreen = () => {
  const styles = useStyles();
  const { isChecked, setIsChecked, handlePress, pdf } = useApproveLoanPdf();

  return (
    <View style={styles.loanDocContainer}>
      {/* {pdf ? ( */}
      <Pdf
        trustAllCerts={false}
        source={{ uri: `${PUBLIC_IMAGE_URL}${pdf}` }}
        style={styles.pdf}
        renderActivityIndicator={() => <LoadingInView />}
      />
      {/* ) : (
        <LoadingView />
      )} */}
      <View style={styles.buttonContainer}>
        <Checkbox
          label="approvedLoan.agreeToTermsAndConditions"
          isChecked={isChecked}
          onChange={setIsChecked}
        />
        <Button.Primary
          fullWidth
          text="common.next"
          customWrapperStyle={[styles.button, !isChecked && styles.disbaled]}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};
