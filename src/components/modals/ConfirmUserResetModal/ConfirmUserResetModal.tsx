import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { useStyles } from './ConfirmUserResetModal.styles';
import { Fail } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { ConfirmResetModalProps } from './ConfirmUserResetModal.types';

export const ConfirmUserResetModal: FC<ConfirmResetModalProps> = ({
  confirm = () => {},
  cancel = () => {},
}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: Colors.error }]}>
        <Fail />
      </View>
      <Text
        center
        demiBold
        size={22}
        marginTop={30}
        lineHeight={30}
        children={'passAuth.change_user'}
      />
      <Text
        children={'passAuth.change_user_desc'}
        label
        marginTop={36}
        color={Colors.textBlack400}
        style={{ textAlign: 'center' }}
      />
      <View style={styles.buttonsContainer}>
        <Button.Secondary
          onPress={cancel}
          text="common.cancel"
          customWrapperStyle={styles.button}
          customTextStyle={styles.buttonText}
          size={'large'}
        />
        <Button.Primary
          onPress={confirm}
          text="common.change"
          customWrapperStyle={styles.button}
          customTextStyle={styles.buttonText}
          size={'large'}
        />
      </View>
    </View>
  );
};
