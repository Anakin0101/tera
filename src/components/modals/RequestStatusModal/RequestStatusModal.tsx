import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { RequestStatusModalProps } from './RequestStatusModal.types';
import { useStyles } from './RequestStatusModal.styles';
import { Done, Fail } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

export const RequestStatusModal: FC<RequestStatusModalProps> = ({ success, message, onClose }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View
        style={[styles.iconContainer, { backgroundColor: success ? Colors.success : Colors.error }]}
      >
        {success ? <Done /> : <Fail />}
      </View>
      <Text
        center
        demiBold
        size={22}
        marginTop={24}
        lineHeight={30}
        children={success ? 'products.completed' : 'products.failed'}
      />
      <Text children={message} label marginTop={20} color={Colors.textBlack400} />
      <Button.Primary
        onPress={onClose}
        text="common.thankyou"
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
        fixedWidth
      />
    </View>
  );
};
