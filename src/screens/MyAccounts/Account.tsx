import { Pressable, View } from 'react-native';
import React, { FC } from 'react';
import { IAccountProps } from './MyAccounts.types';
import { useStyles } from './MyAccounts.styles';
import { CheckCircle } from 'assets/SVGs';
import { Divider, Text } from 'components';

const data = {
  iban: 'GE07BS****3232',
  amount: 208.5,
};

export const Account: FC<IAccountProps> = ({ isSelected, onPress }) => {
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
              <Text children={data.iban} size={14} />
              <Text size={16} style={styles.bold}>
                {data.amount} ₾
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
