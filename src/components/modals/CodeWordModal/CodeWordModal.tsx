import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './CodeWordModal.styles';
import { CodeWordModalProps } from './CodeWordModal.types';
import { useTranslation } from 'react-i18next';

export const CodeWordModal: FC<CodeWordModalProps> = ({ onPress }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const title = `${t('registration.forgot_code_word')} ${t('registration.code_word')}?`;

  return (
    <>
      <View style={styles.header}>
        <Text children={title} color={Colors.textBlack} center size={20} style={styles.title} />
        <Text
          center
          children={'registration.forgot_code_word_description'}
          color={Colors.textBlack500}
        />
      </View>
      <Button.Primary
        onPress={() => {
          onPress();
        }}
        fixedWidth
        text="registration.continue_with_biometrics"
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
      />
    </>
  );
};
