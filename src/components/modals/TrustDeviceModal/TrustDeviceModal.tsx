import React, { FC } from 'react';
import { View } from 'react-native';
import { VerifiedPhoneIcon } from 'assets/SVGs';
import { useStyleTheme } from './TrustDeviceModal.styles';
import { Button, Text } from 'components';

import { useTranslation } from 'react-i18next';
import { TrustDeviceModalProps } from './types/TrustDeviceModal.types';
import { getTrustMethodName } from './utils/getTrustMethodName';

export const TrustDeviceModal: FC<TrustDeviceModalProps> = ({ methodName, openOTPModal }) => {
  const { t } = useTranslation();
  const styles = useStyleTheme();

  return (
    <View style={styles.container}>
      <VerifiedPhoneIcon style={styles.icon} />
      <Text style={styles.text}>
        {t('trustDevice.title', { name: methodName ? t(getTrustMethodName(methodName)) : '' })}
      </Text>
      <Text children="trustDevice.description" style={styles.label} />
      <Button.Primary text="trustDevice.CTAText" size="large" fullWidth onPress={openOTPModal} />
    </View>
  );
};
