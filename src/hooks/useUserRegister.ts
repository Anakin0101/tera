import { useRegisterUserMutation } from 'services/apis';
import { RegisterUserAPIResponseType } from 'services/apis/authAPI/authAPI.types';
import { CustomBackendError } from 'services/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { buildRegisterUserRequest } from 'store/slices/registerUser';
import { RegisterUserStateProps } from 'store/slices/registerUser/types';
import { openToast } from 'utils/toast';

export const useUserRegister = () => {
  const [registerUser, { isError, data, isLoading }] = useRegisterUserMutation();
  const {
    personalId: storedPersonalId,
    email: storedEmail,
    mobile: storedMobile,
    culture: storedCulture,
    cardData: storedCardData,
    userName: storedUserName,
    secretWord: storderSecretWord,
    sendOtp: storedSendOtp,
    otp: storedOtp,
  } = useAppSelector(state => state.registerUser);
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();

  const commonHeaders = {
    'X-Bank-UserIp': userIp,
  };

  const handleUserRegister = async (body: RegisterUserStateProps, successCallback?: () => void) => {
    const { personalId, mobile, email, culture, secretWord, userName, cardData, sendOtp, otp } =
      body;

    try {
      const res: RegisterUserAPIResponseType = await registerUser({
        headers: commonHeaders,
        body: {
          personalId: personalId || storedPersonalId,
          mobile: mobile || storedMobile,
          email: email || storedEmail,
          culture: culture || storedCulture,
          secretWord: secretWord || storderSecretWord,
          userName: userName || storedUserName,
          cardData: cardData || storedCardData,
          sendOtp: sendOtp || storedSendOtp,
          otp: otp || storedOtp,
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
      console.warn('Error during registerUser: ', err);
      if ((err as CustomBackendError).data.showErrorUi) {
        const errorText = (err as CustomBackendError).data.title || 'Something went wrong';
        openToast(errorText, 'error');
      }
    }
  };

  return {
    handleUserRegister,
    isLoading,
    isError,
    isSuccess: data?.success,
  };
};
