import { useState, useEffect } from 'react';
import { Keyboard, Platform, KeyboardEvent } from 'react-native';

const isIOS = Platform.OS === 'ios';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isKeyboardOpened, setIsKeyboardOpened] = useState<boolean>(false);

  const handleKeyboardDidShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e?.endCoordinates?.height);
    setIsKeyboardOpened(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardHeight(0);
    setIsKeyboardOpened(false);
  };

  useEffect(() => {
    // keyboardWillShow is not supported on android
    const showEvent = isIOS ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = isIOS ? 'keyboardWillHide' : 'keyboardDidHide';

    const handleShowSubsc = Keyboard.addListener(showEvent, handleKeyboardDidShow);
    const handleHideSubsc = Keyboard.addListener(hideEvent, handleKeyboardDidHide);

    return () => {
      handleShowSubsc.remove();
      handleHideSubsc.remove();
    };
  }, []);

  return { keyboardHeight, isKeyboardOpened };
};
