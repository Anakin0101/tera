import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Text, ControlledInput, Account } from 'components';
import { withLoginScreen } from 'components/HOC';
import { PasswordOnlyLoginBaseProps } from './PasswordOnlyLoginScreen.types';
import useStyles from './PasswordOnlyLoginScreen.styles';
import { removeValue } from 'storage/index';
import { APP_LAUNCHED } from 'storage/constants';
import { PASSCODE_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { useKeyChain } from 'hooks/useKeychain';
import { useLogin } from 'hooks/useLogin';

const PasswordOnlyLoginScreenBase: FC<PasswordOnlyLoginBaseProps> = () => {
  const styles = useStyles();

  const { savedUserName } = useKeyChain();
  const { handleSignIn, control } = useLogin(savedUserName);

  return (
    <View style={styles.wrapper}>
      {savedUserName && <Account user={savedUserName} />}
      <Button.Secondary text="მომხმარებლის შეცვლა" size="medium" />
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
      <Pressable onPress={() => removeValue(APP_LAUNCHED)}>
        <Text children="Start with onboarding" marginTop={20} />
      </Pressable>
    </View>
  );
};

export const PasswordOnlyLoginScreen = withLoginScreen<
  PasswordOnlyLoginBaseProps,
  typeof PASSCODE_LOGIN_SCREEN
>(PasswordOnlyLoginScreenBase, PASSCODE_LOGIN_SCREEN);
