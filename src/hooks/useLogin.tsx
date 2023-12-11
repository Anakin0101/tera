import { useNavigation } from '@react-navigation/native';
import { OTPModal } from 'components/modals';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import React from 'react';
import { useLoginByRefreshTokenMutation, useLoginUserMutation } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setPasscodeTries, setUserCredentials } from 'store/slices/userInfo';
import { closeModal, openModal } from 'utils/modal';
import { openToast } from 'utils/toast';

export const useLogin = () => {
  const [loginUser] = useLoginUserMutation();
  const [loginByRefreshToken] = useLoginByRefreshTokenMutation();
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppSelector(state => state.userInfo);
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();

  const handleSignInWithOTP = (OTPCode: string, loginName: string, password: string) => {
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
          dispatch(setPasscodeTries(0));
        }
      })
      .catch(err => {
        const errorTitle = (err as { [key: string]: any })?.data?.title;
        openToast(errorTitle, 'error');
        console.error(err);
      });
  };

  const handleSignIn = (loginName: string, password: string) => {
    if (loginName && password) {
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
            dispatch(setPasscodeTries(0));
            res.accessToken
              ? dispatch(
                  setUserCredentials({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                  }),
                )
              : openModal({
                  element: (
                    <OTPModal onFinished={code => handleSignInWithOTP(code, loginName, password)} />
                  ),
                });
          }
        })
        .catch(err => {
          const errorTitle = (err as { [key: string]: any })?.data?.title;
          openToast(errorTitle, 'error');
          console.error(err);
        });
    }
  };

  const handlePasscodeSignIn = async () => {
    try {
      const res = await loginByRefreshToken({
        refreshToken,
        headers: { 'X-Bank-UserIp': userIp },
      }).unwrap();

      if (res) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, error } = res;
        if (newAccessToken && newRefreshToken) {
          dispatch(setPasscodeTries(0));
          dispatch(
            setUserCredentials({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            }),
          );
        }
        if (error) {
          openToast(error, 'error');
          navigate(PASSWORD_LOGIN_SCREEN);
          console.error('error in loginByRefreshToken service: ', error);
        }
      }
    } catch (error) {
      console.error('Error in handlePasscodeSignIn:', error);
    }
  };

  return {
    handleSignIn,
    handlePasscodeSignIn,
  };
};
