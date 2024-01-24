import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Checkbox, Divider, LoadingView, Text } from 'components';
import { FontSize } from 'theme/Variables';
import { useStyles } from './LoanRequestTermsScreen.styles';
import { TitleProps } from './LoanRequestTermsScreen.types';
import { useLoanRequestTerms } from './container';

const Title: FC<TitleProps> = ({ value }) => {
  return <Text medium marginTop={32} size={FontSize.regularPlus} children={value} />;
};

export const LoanRequestTermsScreen = () => {
  const styles = useStyles();
  const {
    consentToDataProcessing,
    consentToProcessCreditInfo,
    consentToProcessRemittances,
    setConsentToDataProcessing,
    setConsentToProcessCreditInfo,
    setConsentToProcessRemittances,
    handlePress,
    allChecked,
    consentTexts,
    isConsentTextsLoading,
  } = useLoanRequestTerms();

  if (isConsentTextsLoading) {
    return <LoadingView />;
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.textContainer}>
        <Title value="loanRequest.consentToDataProcessing" />
        <Text children={consentTexts?.consentTodataProcessing} marginTop={18} secondary />
        <Title value="loanRequest.consentToCheckCreditInfo" />
        <Text
          children={consentTexts?.consentToDataProcessingInCreditInfo}
          marginTop={18}
          secondary
        />
        <Title value="loanRequest.consentToCheckRemittanceInfo" />
        <Text
          children={consentTexts?.consentToMessageDataProcessingInfo}
          marginTop={18}
          secondary
        />
      </View>
      <Divider height={1} marginTop={36} />
      <View style={styles.footer}>
        <Checkbox
          label="loanRequest.consentToDataProcessing"
          isChecked={consentToDataProcessing}
          onChange={setConsentToDataProcessing}
          style={styles.checkbox}
        />
        <Checkbox
          label="loanRequest.consentToCheckCreditInfo"
          isChecked={consentToProcessCreditInfo}
          onChange={setConsentToProcessCreditInfo}
          style={styles.checkbox}
        />
        <Checkbox
          label="loanRequest.consentToCheckRemittanceInfo"
          isChecked={consentToProcessRemittances}
          onChange={setConsentToProcessRemittances}
          style={[styles.checkbox, styles.alignStart]}
        />
        <Button.Primary
          fullWidth
          text="common.next"
          onPress={handlePress}
          customWrapperStyle={[styles.button, !allChecked && styles.disabled]}
        />
      </View>
    </ScrollView>
  );
};
