import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, Text } from 'components';
import { ActionButtons } from 'components/Slider/ActionButtons';
import { Colors } from 'theme/Variables';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { formatMoney } from 'utils/formatMoney';
import { formatDateFullMonth } from 'utils/formatDate';
import { useStyles } from './TransactionDetailsScreen.styles';
import { useTransactionDetails } from './container';
import { Income } from 'assets/SVGs';

export const TransactionDetailsScreen = () => {
  const styles = useStyles();
  const { actions } = useTransactionDetails();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerSection}>
            <View style={[styles.iconContainer, styles.marginTop]} />
            <View>
              <Text children="გივი დაუთაშვილი" color={Colors.inactiveTint} />
              <Text
                medium
                size={30}
                lineHeight={34}
                color={Colors.success}
                children={formatMoney(1000, 'GEL')}
              />
              <Text
                label
                children={formatDateFullMonth('11-02-2022', 'DD-MM-YYYY')}
                color={Colors.textBlack500}
              />
            </View>
          </View>
          <Divider height={1} width="100%" marginTop={16} marginBottom={16} />
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Income />
            </View>
            <View>
              <Text children="შემოსავლები" color={Colors.inactiveTint} />
              <Text children="ჩარიცხვა" medium size={16} />
            </View>
          </View>
        </View>
        <ActionButtons actions={actions} actionButtonsContainer={styles.actionButtonsContainer} />
        <View style={styles.main}>
          <View style={styles.section}>
            <Text children="common.from" medium size={18} />
            <DetailsItem label="transactionDetails.sender" value={'ზურა'} />
            <DetailsItem label="transactions.account" value={'GB468934587345340900'} />
            <DetailsItem label="transactionDetails.bank" value={'ტერაბანკი'} />
          </View>
          <Divider />
          <View style={styles.section}>
            <Text children="transactionDetails.to" medium size={18} />
            <DetailsItem label="transactionDetails.receiver" value={'ზურა'} />
            <DetailsItem label="transactions.account" value={'GB468934587345340900'} />
            <DetailsItem label="transactionDetails.bank" value={'ტერაბანკი'} />
          </View>
          <Divider />
          <View style={styles.section}>
            <Text children="products.details" medium size={18} />
            <DetailsItem label="transactionDetails.paymentType" value={'ჩარიცხვა'} />
            <DetailsItem label="transactionDetails.amount" value={formatMoney(1000, 'GEL')} />
            <DetailsItem label="transactionDetails.desc" value={'პირადი გადარიცხვა'} />
            <DetailsItem
              label="transactions.date"
              value={formatDateFullMonth('11-02-2022', 'DD-MM-YYYY')}
            />
            <DetailsItem label="transactionDetails.docNumber" value={'123456789'} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
