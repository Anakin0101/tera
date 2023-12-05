import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text, ControlledInput, Account } from 'components';
import { withLoginScreen } from 'components/HOC';
import { PasswordOnlyLoginBaseProps } from './PasswordOnlyLoginScreen.types';
import useStyles from './PasswordOnlyLoginScreen.styles';
import { PASSWORD_ONLY_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import { useUserReset, useLogin, useKeyChain } from 'hooks';

const PasswordOnlyLoginScreenBase: FC<PasswordOnlyLoginBaseProps> = () => {
  const styles = useStyles();
  const { savedUserName } = useKeyChain();
  const { handleSignIn, control } = useLogin(savedUserName);
  const { t } = useTranslation();
  const { resetUser } = useUserReset();

  return (
    <View style={styles.wrapper}>
      {savedUserName && <Account user={savedUserName} />}
      <Button.Secondary text={t('passAuth.change_user')} size="medium" onPress={resetUser} />
      <ControlledInput
        control={control}
        name="password"
        label="common:passAuth.password"
        marginTop={20}
        secureTextEntry
      />
      <View style={styles.chechboxContainer}>
        <Text children="common:passAuth.forgot" label special />
      </View>
      <View style={styles.buttonCont}>
        <Button.Primary text="common:passAuth.signin" onPress={handleSignIn} fullWidth />
      </View>
      {/* <Pressable onPress={() => removeValue(APP_LAUNCHED)}>
        <Text children="Start with onboarding" marginTop={20} />
      </Pressable> */}
    </View>
  );
};

export const PasswordOnlyLoginScreen = withLoginScreen<
  PasswordOnlyLoginBaseProps,
  typeof PASSWORD_ONLY_LOGIN_SCREEN
>(PasswordOnlyLoginScreenBase, PASSWORD_ONLY_LOGIN_SCREEN);
