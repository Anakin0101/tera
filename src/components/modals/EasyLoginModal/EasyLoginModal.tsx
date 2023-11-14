import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './EasyLoginModal.styles';
import { Button, SwitchComponent, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { EasyLoginModalProps } from './types/EasyLoginModal.types';
import { FaceIdColoredSvg } from 'assets/SVGs';
import { debounce } from 'utils/debounce';
import { setPostponeEasyLogin, setIgnoreEasyLogin } from 'store/slices/userInfo';
import { useAppDispatch } from 'store/hooks/useAppDispatch';

export const EasyLoginModal: FC<EasyLoginModalProps> = ({ openAuthorizationMethodsScreen }) => {
  const [ignoreEasyLoginValue, setIgnoreEasyLoginValue] = useState<boolean>(false);
  const { t } = useTranslation();
  const styles = useStyleTheme();
  const dispatch = useAppDispatch();

  const debouncedDispatch = debounce((newValue: boolean) => {
    dispatch(setIgnoreEasyLogin(newValue));
  }, 500);

  const handleIgnoreEasyLoginToggle = (newValue: boolean) => {
    setIgnoreEasyLoginValue(newValue);
    debouncedDispatch(newValue);
  };

  const handlePostponeEasyLogin = () => {
    dispatch(setPostponeEasyLogin(true));
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <FaceIdColoredSvg style={styles.icon} />
        <Text style={styles.text}>{t('easyLogin.title')}</Text>
        <Text children="easyLogin.description" style={styles.label} />
      </View>
      <View style={styles.toggleContainer}>
        <Text children="easyLogin.do_not_ask_again" style={styles.label} />
        <SwitchComponent
          value={ignoreEasyLoginValue}
          onValueChange={val => handleIgnoreEasyLoginToggle(val)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button.Text text="easyLogin.next_time" size="large" onPress={handlePostponeEasyLogin} />
        <Button.Primary
          text="easyLogin.activate"
          size="large"
          onPress={openAuthorizationMethodsScreen}
        />
      </View>
    </View>
  );
};
