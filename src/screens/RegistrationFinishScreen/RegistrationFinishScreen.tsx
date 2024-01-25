import React, { FC } from 'react';
import { useStyles } from './RegistrationFinishScreen.styles';
import { View } from 'react-native';
import { Button, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { GuestStackScreenProps } from 'navigation/types';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { RegistrationFinishScreenProps } from './RegistrationFinishScreen.types';

export const RegistrationFinishScreen: FC<RegistrationFinishScreenProps> = ({ route }) => {
  const { isSuccess } = route?.params ?? {};
  const styles = useStyles();
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();

  const handleGoToLoginScreen = () => {
    navigate(PASSWORD_LOGIN_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Text children={'RegistrationFinishScreen'} />
      <Text children={String(isSuccess)} />

      <Button.Primary
        text="common.login"
        onPress={handleGoToLoginScreen}
        fullWidth
        isLoading={false}
        customWrapperStyle={styles.ctaWrapper}
      />
    </View>
  );
};
