import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Search } from 'assets/SVGs';
import { Text } from 'components';
import { useStyles } from './MyAccounts.styles';
import { Account } from './Account';

const data = {
  iban: 'GE07BS****3232',
  amount: 208.5,
};

export const MyAccounts = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const [value, setValue] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  const handlePress = () => {
    setSelectedAccount(prev => (prev !== data.iban ? data.iban : ''));
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Search />
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholder={t('transfers.search')}
        />
      </View>
      <Text children="ჩემი ანგარიში" style={styles.bold} marginTop={32} />
      <Account onPress={handlePress} isSelected={selectedAccount === data.iban} />
    </View>
  );
};
