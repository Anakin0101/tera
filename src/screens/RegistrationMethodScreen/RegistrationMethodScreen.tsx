import React from 'react';
import { useStyles } from './RegistrationMethodScreen.styles';
import { Platform, View } from 'react-native';
import { RegistrationMethodCard, RegistrationTitle } from 'components/index';
import { FaceIdSvg, FingerPrintIcon, LockIcon } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { VERIFICATION_TYPE_SCREEN } from 'navigation/ScreenNames';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const RegistrationMethodScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<RegistrationStackScreenProps<'VerificationScreen'>>();
  const { flow } = useAppSelector(state => state.registerUser);

  const BiometricIcon =
    Platform.OS === 'android' ? (
      <FingerPrintIcon fill={Colors.primary} />
    ) : (
      <FaceIdSvg fill={Colors.primary} />
    );

  const handleNavigation = () => {
    navigate(VERIFICATION_TYPE_SCREEN);
  };
  return (
    <View style={styles.container}>
      <RegistrationTitle
        text={
          flow === 'registration'
            ? 'registration.choose_registration_method'
            : 'passwordRecovery.choose_password_recovery_method'
        }
      />
      <RegistrationMethodCard
        icon={BiometricIcon}
        title={'registration.with_biometric_info'}
        description={'registration.with_biometric_info_desc'}
        handlePress={() => {}}
        borderTop
        borderBottom
      />
      <RegistrationMethodCard
        icon={<LockIcon />}
        title={'registration.with_code_word'}
        description={'registration.with_code_word_desc'}
        handlePress={handleNavigation}
        borderBottom
      />
    </View>
  );
};
