import { useRecoverPasswordMutation } from 'services/apis';
import { RegisterUserAPIResponseType } from 'services/apis/authAPI/authAPI.types';
import { CustomBackendError } from 'services/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { buildRegisterUserRequest } from 'store/slices/registerUser';
import { RecoverPasswordStateProps } from 'store/slices/registerUser/types';
import { openToast } from 'utils/toast';

export const useRecoverPassword = () => {
  const [recoverPassword, { isError, data, isLoading }] = useRecoverPasswordMutation();
  const {
    channelId: storedChannelId,
    culture: storedCulture,
    timezoneOffset: storedTimezoneOffset,
    customerIp: storedCustomerIp,
    customerBrowser: storedCustomerBrowser,
    channelData: storedChannelData,
    pin: storedPin,
    mobile: storedMobile,
    email: storedEmail,
    cardData: storedCardData,
    userName: storedUserName,
    secretWord: storderSecretWord,
    otp: storedOtp,
    defaultLogin: storedDevaultLogin,
    ignoreEmptyUserNameCheck: storedIgnoreEmptyUserNameCheck,
  } = useAppSelector(state => state.registerUser);
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();

  const commonHeaders = {
    'X-Bank-UserIp': userIp,
  };

  const handleRecoverPassword = async (
    body: RecoverPasswordStateProps,
    successCallback?: () => void,
  ) => {
    const { pin, mobile, email, culture, secretWord, userName, cardData, sendOtp, otp } = body;

    try {
      const res: RegisterUserAPIResponseType = await recoverPassword({
        headers: commonHeaders,
        body: {
          channelId: storedChannelId,
          culture: culture || storedCulture,
          timezoneOffset: storedTimezoneOffset,
          customerIp: storedCustomerIp,
          customerBrowser: storedCustomerBrowser,
          channelData: storedChannelData,
          pin: pin || storedPin,
          mobile: mobile || storedMobile,
          email: email || storedEmail,
          cardData: cardData || storedCardData,
          secretWord: secretWord || storderSecretWord,
          userName: userName || storedUserName,
          sendOtp: sendOtp || false,
          otp: otp || storedOtp,
          ignoreEmptyUserNameCheck: storedIgnoreEmptyUserNameCheck,
          defaultLogin: storedDevaultLogin,
        },
      }).unwrap();

      if (res.success) {
        dispatch(buildRegisterUserRequest(body));
        successCallback?.();
      }

      if (res.error) {
        console.warn('response returned with an error: ', res.error);
        openToast('something went wrong', 'error');
      }
    } catch (err) {
      console.warn('Error during recoverPassword: ', err);
      if ((err as CustomBackendError).data.showErrorUi) {
        const errorText = (err as CustomBackendError).data.title || 'Something went wrong';
        openToast(errorText, 'error');
      }
    }
  };

  return {
    handleRecoverPassword,
    isLoading,
    isError,
    isSuccess: data?.success,
  };
};
