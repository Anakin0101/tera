import { OTPModalTemp } from 'components/modals/OTPModal/OTPModalTemp';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginByRefreshTokenMutation, useLoginUserMutation } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setUserCredentials } from 'store/slices/userInfo';
import { setCredentials } from 'utils/keychain';
import { closeModal, openModal } from 'utils/modal';
import { openToast } from 'utils/toast';
import { useKeyChain } from './useKeychain';

export const useLogin = (savedUsername?: string | null | undefined) => {
  const { control, reset, getValues } = useForm();
  const [loginUser] = useLoginUserMutation();
  const [loginByRefreshToken] = useLoginByRefreshTokenMutation();
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppSelector(state => state.userInfo);
  const { savedPasscode = '' } = useKeyChain();
  const { userIp } = useAppSelector(state => state.deviceInfo);

  const getFormValues = () => {
    const { loginName, password, save } = getValues();
    return {
      loginName: savedUsername || loginName,
      password,
      save,
    };
  };

  const handleSignInWithOTP = (OTPCode: string) => {
    const { loginName, password } = getFormValues();
    loginUser({
      loginName,
      password,
      headers: {
        'X-Bank-Isstrongauthrequest': '1',
        'X-Bank-Otp': OTPCode,
      },
    })
      .unwrap()
      .then(res => {
        if (res.accessToken) {
          dispatch(
            setUserCredentials({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            }),
          );
          closeModal();
        }
      })
      .catch(err => {
        const errorTitle = (err as { [key: string]: any })?.data?.title;
        openToast(errorTitle, 'error');
        console.error(err);
      });
  };

  const handleSignIn = () => {
    const { loginName, password } = getFormValues();
    loginUser({
      loginName,
      password,
      headers: {
        'X-Bank-Isstrongauthrequest': '1',
      },
    })
      .unwrap()
      .then(res => {
        if (res.success) {
          res.accessToken
            ? dispatch(
                setUserCredentials({
                  accessToken: res.accessToken,
                  refreshToken: res.refreshToken,
                }),
              )
            : openModal({
                element: <OTPModalTemp onFinished={code => handleSignInWithOTP(code)} />,
              });
        }
      })
      .catch(err => {
        reset({
          loginName: '',
          password: '',
        });
        const errorTitle = (err as { [key: string]: any })?.data?.title;
        openToast(errorTitle, 'error');
        console.error(err);
      });
  };

  const handleSaveUserToggle = () => {
    const { loginName, save } = getFormValues();
    if (save) {
      setCredentials({ username: loginName });
    }
  };

  const handlePasscodeSignIn = () => {
    loginByRefreshToken({
      refreshToken,
      //   Passcode: savedPasscode,
      Passcode: savedPasscode || '',
      headers: { 'X-Bank-UserIp': userIp },
    });
  };

  return {
    handleSignIn,
    control,
    handleSaveUserToggle,
    handlePasscodeSignIn,
  };
};
