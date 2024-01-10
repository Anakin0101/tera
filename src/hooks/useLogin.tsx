import { useNavigation } from '@react-navigation/native';
import { OTPModal } from 'components/modals';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import React from 'react';
import { useLoginByRefreshTokenMutation, useLoginUserMutation } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setOTPCodeErrorTimes, setPasscodeTries, setUserCredentials } from 'store/slices/userInfo';
import { setLoginName } from 'utils/keychain';
import { closeModal, openModal } from 'utils/modal';
import { openToast } from 'utils/toast';
import { useKeyChain } from './useKeychain';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { resetStateAction } from 'store/actions/reset';
import { setValue } from 'storage/index';
import { USER_LOGGED_OUT } from 'storage/constants';

export const useLogin = () => {
  const [loginUser] = useLoginUserMutation();
  const [loginByRefreshToken] = useLoginByRefreshTokenMutation();
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppSelector(state => state.userInfo);
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();
  const { savedLoginName } = useKeyChain();

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
        dispatch(setOTPCodeErrorTimes());
        openToast(errorTitle, 'error');
        console.warn('Error in loginUser with OTP: ', err);
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
        .then(async res => {
          if (res.success) {
            dispatch(setPasscodeTries(0));
            setValue(USER_LOGGED_OUT, false);
            if (savedLoginName && savedLoginName !== loginName) {
              await resetKeychainValues();
              dispatch(resetStateAction());
            }
            setLoginName(loginName);
            res.accessToken
              ? dispatch(
                  setUserCredentials({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                  }),
                )
              : openModal({
                  element: (
                    <OTPModal
                      onFinished={code => {
                        handleSignInWithOTP(code, loginName, password);
                      }}
                    />
                  ),
                  disableDynamicSizing: true,
                  disablePanning: true,
                  withKeyboard: true,
                });
          }
        })
        .catch(err => {
          const errorTitle = (err as { [key: string]: any })?.data?.title;
          openToast(errorTitle, 'error');
          console.warn(err);
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
          console.warn('error in loginByRefreshToken service: ', error);
        }
      }
    } catch (error) {
      console.warn('Error in handlePasscodeSignIn:', error);
    }
  };

  return {
    handleSignIn,
    handlePasscodeSignIn,
  };
};
