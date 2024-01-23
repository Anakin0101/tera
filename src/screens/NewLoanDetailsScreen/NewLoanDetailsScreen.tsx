import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, DetailsItem, Divider, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { Timer } from 'assets/SVGs';
import { useStyles } from './NewLoanDetailsScreen.styles';
import { useNewLoanDetails } from './container';

export const NewLoanDetailsScreen = () => {
  const styles = useStyles();
  const { newLoan, handleRequestLoan } = useNewLoanDetails();

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.growfull}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.growfull}>
        <View style={styles.headerContainer}>
          <View style={styles.headerItem}>
            <View style={styles.iconContainer} />
            <View>
              <Text children={newLoan?.loanType} medium size={16} />
              <Text
                children={formatMoney(parseFloat(newLoan?.amount), newLoan?.currency)}
                size={18}
              />
            </View>
          </View>
          <Divider height={1} marginTop={16} marginBottom={16} />
          <View style={styles.headerItem}>
            <View style={styles.iconContainer}>
              <Timer />
            </View>
            <View>
              <Text children="loanRequest.duration" secondary size={12} />
              <Text
                children="newDeposit.months"
                translateProp={{ value: newLoan?.duration }}
                size={16}
              />
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.inner}>
            <DetailsItem label="loanRequest.paymentDate" value={newLoan?.paymentDate} />
            <DetailsItem
              label="loanRequest.typeOfIncome"
              value={newLoan?.typeOfIncome?.map(item => item.name)?.join(',')}
            />
            <DetailsItem
              label="loanRequest.income"
              value={formatMoney(parseFloat(newLoan?.income))}
            />
            <DetailsItem label="loanRequest.workplace" value={newLoan?.workplace} />
            <DetailsItem label="loanRequest.position" value={newLoan?.position} />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button.Primary
          fullWidth
          text="loanRequest.request"
          onPress={handleRequestLoan}
          customWrapperStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};
