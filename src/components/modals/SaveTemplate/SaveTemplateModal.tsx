import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'components';
import { ModalProps } from './SaveTemplateModal.types';
import { useStyles } from './SaveTemplateModal.styles';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setTransferType } from 'store/slices/transfers';
import { useSaveTemplateMutation } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { closeModal } from 'utils/modal';
export const SaveTemplateModal: FC<ModalProps> = () => {
  const templateData = useAppSelector(state => state.transfers.currentTransfer);
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const [saveTemplate] = useSaveTemplateMutation();
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const [accountName, setAccountName] = useState('');

  const handleChange = (value: string) => {
    setAccountName(value);
    dispatch(
      setTransferType({
        name: value,
      }),
    );
  };
  const saveSingleTemplate = () => {
    let headers = {
      'X-Bank-userip': userIp,
      'X-Bank-Sendotp': 'false',
      'X-Bank-Isstrongauthrequest': true,
    };
    saveTemplate({ headers: headers, body: templateData });
    closeModal();
  };

  return (
    <View>
      <TextInput
        label="products.accountName"
        value={accountName}
        onChangeText={handleChange}
        marginTop={32}
        autoFocus
      />
      <Button.Primary
        text="common.save"
        fullWidth
        customWrapperStyle={styles.button}
        onPress={saveSingleTemplate}
      />
    </View>
  );
};
