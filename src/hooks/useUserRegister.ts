import { useCallback, useEffect } from 'react';
import { useRegisterUserMutation } from 'services/apis';
import { RegisterUserAPIResponseType } from 'services/apis/authAPI/authAPI.types';
import { CustomBackendError } from 'services/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { openToast } from 'utils/toast';

export const useUserRegister = () => {
  const [registerUser, { isError, data, isLoading }] = useRegisterUserMutation();
  const { personalId, email, mobile, culture, cardData, userName, secretWord, sendOtp, otp } =
    useAppSelector(state => state.registerUser);
  const { userIp } = useAppSelector(state => state.deviceInfo);

  const handleUserRegister = useCallback(async () => {
    if (personalId) {
      const commonHeaders = {
        'X-Bank-UserIp': userIp,
      };
      try {
        const res: RegisterUserAPIResponseType = await registerUser({
          headers: commonHeaders,
          body: {
            personalId,
            mobile,
            email,
            culture,
            secretWord,
            userName,
            cardData,
            sendOtp,
            otp,
          },
        }).unwrap();

        if (res.error) {
          console.warn('response returned with an error: ', res.error);
          openToast('something went wrong', 'error');
        }
      } catch (err) {
        console.warn('Error during registerUser: ', err);
        if ((err as CustomBackendError).data.showErrorUi) {
          openToast('something went wrong', 'error');
        }
      }
    }
  }, [
    personalId,
    userIp,
    registerUser,
    mobile,
    email,
    culture,
    secretWord,
    userName,
    cardData,
    sendOtp,
    otp,
  ]);

  useEffect(() => {
    handleUserRegister();
  }, [handleUserRegister]);

  return {
    handleUserRegister,
    isLoading,
    isError,
    isSuccess: data?.success,
  };
};
