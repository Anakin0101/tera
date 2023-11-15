import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'components';
import { ModalProps } from './ChangeAccountNameModal.types';
import { useStyles } from './ChangeAccountNameModal.styles';
// import { useUpdateAccountNameMutation } from 'services/apis/productsAPI/productsAPI';

export const ChangeAccountNameModal: FC<ModalProps> = ({ name }) => {
  const styles = useStyles();
  const [accountName, setAccountName] = useState(name);
  // const [updateAccountName] = useUpdateAccountNameMutation();

  const handleChange = (value: string) => {
    setAccountName(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="products.accountName"
        value={accountName}
        onChangeText={handleChange}
        marginTop={32}
        autoFocus
      />
      <Button.Primary text="common.save" fullWidth customWrapperStyle={styles.button} />
    </View>
  );
};
