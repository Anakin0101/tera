import React from 'react';
import { View } from 'react-native';
import { useStyles } from './MoneyTransferInfo.styles';
import { MoneyTransferInfoProps } from './MoneyTransferInfo.types';
import { Text } from 'components/Text/Text';
import { formatMoney } from 'utils/formatMoney';

export const MoneyTransferInfo: React.FC<MoneyTransferInfoProps> = ({ transferResponse }) => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.wrapper}>
        <View>
          <Text
            style={[styles.title, styles.titleMargin]}
            children={'checkMoneyTransferProviderScreen.senderInfo'}
          />
          <Text style={[styles.desc, styles.descCapitalize]}>
            {transferResponse?.receiverFirstName} {transferResponse?.receiverLastName}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.title, styles.titleMargin]}
            children={'checkMoneyTransferProviderScreen.senderCountry'}
          />
          <Text style={styles.desc}>{transferResponse?.countryCode}</Text>
        </View>
        <View>
          <Text
            style={[styles.title, styles.titleMargin]}
            children={'checkMoneyTransferProviderScreen.amountSent'}
          />
          <Text style={styles.desc}>
            {formatMoney(transferResponse?.amount)} {transferResponse?.currency}
          </Text>
        </View>
      </View>
    </View>
  );
};
