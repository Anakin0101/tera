import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { MainStackScreenProps } from 'navigation/types';
import { useKeyboard } from 'utils/useKeyboard';
import { useAddBasketServiceMutation } from 'services/apis';
import { openToast } from 'utils/toast';

export const useAddCart = () => {
  const { goBack } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { isKeyboardOpened } = useKeyboard();

  const [cartName, setCartName] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const [addBaskeetService] = useAddBasketServiceMutation();

  const addBaskeetServiceOnPress = useCallback(() => {
    try {
      if (isSending) return;
      setIsSending(true);
      addBaskeetService({
        name: cartName,
      })
        .unwrap()
        .then(res => {
          setIsSending(false);
          if (res) {
            goBack();
          }
        })
        .catch(ex => {
          setIsSending(false);
          if ('data' in ex && ex?.data?.detail) {
            openToast(ex.data.detail, 'error');
          }
        });
    } catch (ex) {
      console.warn(ex);
      setIsSending(false);
    }
  }, [addBaskeetService, cartName, goBack, isSending]);

  return {
    isKeyboardOpened,
    setCartName,
    addBaskeetServiceOnPress,
    isSending,
  };
};
