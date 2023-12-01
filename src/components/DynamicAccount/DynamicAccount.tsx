import { Pressable, View } from 'react-native';
import React, { FC } from 'react';
import { IAccountProps } from './DynamicAccount.types';
import { useStyles } from './DynamicAccount.styles';
import { CheckCircle } from 'assets/SVGs';
import { Divider, Text } from 'components';

export const DynamicAccount: FC<IAccountProps> = ({ data, isSelected, onPress }) => {
  const styles = useStyles();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.account}>
        <View style={styles.cardContainer}>
          <View style={styles.card} />
        </View>
        <View style={styles.ibanWrapper}>
          <View style={styles.iban}>
            <View>
              <Text children={data.iban ? data.iban : data.accountIban} size={14} />
              <Text size={16} style={styles.bold}>
                {data.balance} {data.ccy}
              </Text>
            </View>
            {isSelected && (
              <View style={styles.check}>
                <CheckCircle />
              </View>
            )}
          </View>
          <Divider height={1} marginTop={18} marginBottom={18} width="100%" />
        </View>
      </View>
    </Pressable>
  );
};
