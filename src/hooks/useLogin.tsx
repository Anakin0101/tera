import { useNavigation } from '@react-navigation/native';
import { OTPModal } from 'components/modals';
import {
  GUEST_NAVIGATOR,
  INITIAL_STACK,
  MAIN_NAVIGATOR,
  PASSWORD_LOGIN_SCREEN,
} from 'navigation/ScreenNames';
import { RoutesGenericProp } from 'navigation/types';
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
import { CustomBackendError } from 'services/types';

export const useLogin = () => {
  const [loginUser, { isLoading: loginUserLoading }] = useLoginUserMutation();
  const [loginByRefreshToken, { isLoading: loginByRefreshTokenLoading }] =
    useLoginByRefreshTokenMutation();
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppSelector(state => state.userInfo);
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const { navigate, replace } =
    useNavigation<RoutesGenericProp<'guestNavigator' | 'mainNavigator'>>();
  const { savedLoginName } = useKeyChain();

  const handleException = (error: unknown) => {
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const customError = error as CustomBackendError;
      const toastMessage = customError.data?.detail;

      if (customError?.data?.showErrorUi && toastMessage) {
        openToast(toastMessage, 'error');
      }
    }
  };

  const handleSignInWithOTP = (OTPCode: string, loginName: string, password: string) => {
    loginUser({
      loginName,
      password,
      headers: {
        'X-Bank-Isstrongauthrequest': 'true',
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
          replace(MAIN_NAVIGATOR, { screen: INITIAL_STACK });
        }
      })
      .catch(err => {
        console.warn('Error in loginUser with OTP: ', err);
        handleException(err);
        dispatch(setOTPCodeErrorTimes());
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
            if (savedLoginName && savedLoginName !== loginName) {
              await resetKeychainValues();
              dispatch(resetStateAction());
            }
            setLoginName(loginName);
            // if accesstoken returns from the API - we log the user in
            // if only res.success = true, it means device is not trusted and we need to handleSignInWithOTP

            if (res.accessToken) {
              dispatch(
                setUserCredentials({
                  accessToken: res.accessToken,
                  refreshToken: res.refreshToken,
                }),
              );
              replace(MAIN_NAVIGATOR, { screen: INITIAL_STACK });
            } else {
              openModal({
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
          }
        })
        .catch(err => {
          console.warn('Error in handleSignIn: ', err);
          handleException(err);
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
          replace(MAIN_NAVIGATOR, { screen: INITIAL_STACK });
        }
        if (error) {
          openToast(error, 'error');
          navigate(GUEST_NAVIGATOR, { screen: PASSWORD_LOGIN_SCREEN });
          console.warn('error in loginByRefreshToken service: ', error);
        }
      }
    } catch (error) {
      console.warn('Error in handlePasscodeSignIn:', error);
      handleException(error);
    }
  };

  return {
    handleSignIn,
    handlePasscodeSignIn,
    loginUserLoading,
    loginByRefreshTokenLoading,
  };
};
