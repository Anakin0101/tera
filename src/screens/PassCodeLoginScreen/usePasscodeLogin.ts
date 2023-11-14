export const usePasscodeLogin = () => {
  //   const [pinNumber, setPinNumber] = useState('');
  //   const [forgotPasscode, setForgotPasscode] = useState(false);

  //   const signInOnSuccess = useCallback(async () => {
  //     try {
  //       const credentials = await getCredentials();
  //       if (credentials) {
  //       } else {
  //         throw Error();
  //       }
  //     } catch (e) {}
  //   }, []);

  //   useEffect(() => {
  //     (async () => {
  //       if (pinNumber.length === 4) {
  //         //start loading here
  //         const savedPasscode = await getPasscode();

  //         if (savedPasscode === null) {
  //           //stop loading
  //           //alert
  //           setPinNumber('');
  //         } else if (savedPasscode !== pinNumber) {
  //           //stop loading
  //           //alert
  //           setPinNumber('');
  //         } else {
  //           Alert.alert('pin number is correct');
  //           signInOnSuccess();
  //           //   onSuccess();
  //         }
  //       }
  //     })();
  //   }, [pinNumber, signInOnSuccess]);

  //   const onOtherUserPress = useCallback(() => {
  //     // navigate to auth
  //   }, []);

  //   const watchKeyboard = (value: number) => {
  //     if (value !== 10 && value !== 11) {
  //       if (pinNumber.length < 4) {
  //         setPinNumber(`${pinNumber}${value}`);
  //       }
  //     } else if (value === 10) {
  //       //   onFingerPrintPress(); there should be biometricPress
  //     } else if (value === 11 && pinNumber !== '') {
  //       setPinNumber(pinNumber.slice(0, pinNumber.length - 1));
  //     }
  //   };

  //   const onFingerPrintPress = async () => {
  //     const { available, biometryType } = await Biometrics.isSensorAvailable();

  //     const simplePromptConfig = {
  //       promptMessage: 'biometric message',
  //       cancelButtonText: 'close',
  //     };

  //     switch (biometryType) {
  //       case Biometrics.Biometrics:
  //         simplePromptConfig.promptMessage = 'biometric message';
  //         break;
  //       case Biometrics.FaceID:
  //         simplePromptConfig.promptMessage = 'biometric message';
  //         break;
  //     }

  //     if (available) {
  //       const { success } = await Biometrics.simplePrompt(simplePromptConfig);

  //       if (success) {
  //         signInOnSuccess();
  //         return;
  //       }
  //     }

  //     //alert
  //   };

  //   const passcodeLength = useMemo(() => pinNumber.length, [pinNumber]);

  //   const onForgotPasswordPress = () => setForgotPasscode(true);

  //   const onAuthModalBackdropPress = () => setForgotPasscode(false);

  return {
    // watchKeyboard,
    // passcodeLength,
    // onAuthModalBackdropPress,
    // onForgotPasswordPress,
    // setForgotPasscode,
    // onOtherUserPress,
    // forgotPasscode,
    // onFingerPrintPress,
  };
};
