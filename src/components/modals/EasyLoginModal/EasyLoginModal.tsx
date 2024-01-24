import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './EasyLoginModal.styles';
import { Button, SwitchComponent, Text } from 'components';
import { EasyLoginModalProps } from './types/EasyLoginModal.types';
import { FaceIdColoredSvg } from 'assets/SVGs';
import { debounce } from 'utils/debounce';
import { setPostponeEasyLogin, setIgnoreEasyLogin } from 'store/slices/userInfo';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { closeModal } from 'utils/modal';

export const EasyLoginModal: FC<EasyLoginModalProps> = ({
  type,
  handlePress,
  cancelOnly,
  title = 'easyLogin.title',
  description = 'easyLogin.description',
  primaryButtonText = 'easyLogin.activate',
  secondaryButtonText = 'easyLogin.next_time',
}) => {
  const [ignoreEasyLoginValue, setIgnoreEasyLoginValue] = useState<boolean>(false);
  const styles = useStyleTheme();
  const dispatch = useAppDispatch();

  const debouncedDispatch = debounce((newValue: boolean) => {
    dispatch(setIgnoreEasyLogin(newValue));
  }, 500);

  const handleIgnoreEasyLoginToggle = (newValue: boolean) => {
    setIgnoreEasyLoginValue(newValue);
    debouncedDispatch(newValue);
    closeModal?.();
  };

  const handleCancelButtonPress = () => {
    if (!cancelOnly) {
      dispatch(setPostponeEasyLogin(true));
    }
    closeModal?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <FaceIdColoredSvg style={styles.icon} />
        <Text style={styles.text} children={title} />
        <Text children={description} style={styles.label} />
      </View>
      <View style={styles.toggleContainer}>
        {type === 'activate' && (
          <>
            <Text children="easyLogin.do_not_ask_again" style={styles.label} />
            <SwitchComponent
              value={ignoreEasyLoginValue}
              onValueChange={val => handleIgnoreEasyLoginToggle(val)}
            />
          </>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button.Text text={secondaryButtonText} size="large" onPress={handleCancelButtonPress} />
        <Button.Primary text={primaryButtonText} size="large" onPress={handlePress} />
      </View>
    </View>
  );
};
