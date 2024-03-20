import React, { FC, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'components';
import { ModalProps } from './ChangeAccountNameModal.types';
import { useStyles } from './ChangeAccountNameModal.styles';
import { useUpdateAccountNameMutation } from 'services/apis';
import { useCulture } from 'hooks/useCulture';
import { closeModal } from 'utils/modal';

export const ChangeAccountNameModal: FC<ModalProps> = ({ name, accountId }) => {
  const styles = useStyles();
  const { culture } = useCulture();
  const [accountName, setAccountName] = useState(name);
  const [updateName] = useUpdateAccountNameMutation();

  const handleChange = (value: string) => {
    setAccountName(value);
  };

  const handleUpdateName = useCallback(() => {
    if (accountId) {
      updateName({
        culture,
        accountId,
        accountName,
      })
        .unwrap()
        .then(() => {
          closeModal();
        });
    }
  }, [accountId, accountName, culture, updateName]);

  return (
    <View style={styles.container}>
      <TextInput
        label="products.accountName"
        value={accountName}
        onChangeText={handleChange}
        marginTop={32}
        autoFocus
      />
      <Button.Primary
        onPress={handleUpdateName}
        text="common.save"
        fullWidth
        customWrapperStyle={styles.button}
      />
    </View>
  );
};
