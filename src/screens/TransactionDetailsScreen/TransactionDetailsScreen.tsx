import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, IconComponent, Text } from 'components';
import { ActionButtons } from 'components/Slider/ActionButtons';
import { Colors } from 'theme/Variables';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { formatMoney } from 'utils/formatMoney';
import { formatDateFullMonth } from 'utils/formatDate';
import { useStyles } from './TransactionDetailsScreen.styles';
import { useTransactionDetails } from './container';
import { Income, Outcome } from 'assets/SVGs';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { getTransactionTypeNameByEnum } from 'screens/AllTransactionsScreen/ListHeader';
import Images from 'theme/Images';

export const TransactionDetailsScreen = () => {
  const styles = useStyles();
  const { actions } = useTransactionDetails();
  const { selectedTransaction: op } = useAppSelector(state => state.products);

  if (!op) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerSection}>
            <View style={[styles.iconContainer, styles.marginTop]}>
              <IconComponent
                customIconComponentStyles={styles.Icon}
                pngLocalIcon={op.isIncome ? Images().IncomeIcon : Images().PayOutIcon}
              />
            </View>
            <View style={styles.headerDesc}>
              <Text children={op.receiverName} color={Colors.inactiveTint} />
              <Text
                medium
                size={30}
                lineHeight={34}
                color={op.isIncome ? Colors.success : Colors.error}
                children={formatMoney(op.amount, op.currency)}
              />
              <Text label children={formatDateFullMonth(op.docDate)} color={Colors.textBlack500} />
            </View>
          </View>
          <Divider height={1} width="100%" marginTop={16} marginBottom={16} />
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>{op.isIncome ? <Income /> : <Outcome />}</View>
            <View style={styles.headerDesc}>
              <Text children="შემოსავლები" color={Colors.inactiveTint} />
              <Text children="ჩარიცხვა" medium size={16} />
            </View>
          </View>
        </View>
        <ActionButtons actions={actions} actionButtonsContainer={styles.actionButtonsContainer} />
        <View style={styles.main}>
          <View style={styles.section}>
            <Text children="common.from" medium size={18} />
            <DetailsItem label="transactionDetails.sender" value={op.senderName} marginTop={20} />
            <DetailsItem label="transactions.account" value={op.senderIban} marginTop={20} />
            <DetailsItem label="transactionDetails.bank" value={op.senderBankName} marginTop={20} />
          </View>
          <Divider />
          <View style={styles.section}>
            <Text children="transactionDetails.to" medium size={18} />
            <DetailsItem
              label="transactionDetails.receiver"
              value={op.receiverName}
              marginTop={20}
            />
            <DetailsItem label="transactions.account" value={op.receiverIban} marginTop={20} />
            <DetailsItem
              label="transactionDetails.bank"
              value={op.receiverBankName}
              marginTop={20}
            />
          </View>
          <Divider />
          <View style={styles.section}>
            <Text children="products.details" medium size={18} />
            <DetailsItem
              label="transactionDetails.paymentType"
              value={getTransactionTypeNameByEnum(op.opType)}
              marginTop={20}
            />
            <DetailsItem
              label="transactionDetails.amount"
              value={formatMoney(op.amount, op.currency)}
              marginTop={20}
            />
            <DetailsItem label="transactionDetails.desc" value={op.description} marginTop={20} />
            <DetailsItem
              label="transactions.date"
              value={formatDateFullMonth(op.docDate)}
              marginTop={20}
            />
            <DetailsItem
              label="transactionDetails.docNumber"
              value={String(op.docNumber)}
              marginTop={20}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
