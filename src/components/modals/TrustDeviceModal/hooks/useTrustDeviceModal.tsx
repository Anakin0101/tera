import { closeModal, openModal } from 'utils/modal';
import { OTPModalTemp } from 'components/modals/OTPModal/OTPModalTemp';
import { useAddTrustedDeviceMutation } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProps } from 'navigation/types';
import React from 'react';
import { setOTPCode, setUserCredentials } from 'store/slices/userInfo';
import { useKeyChain } from 'hooks/useKeychain';
import { CREATE_PASSCODE_SCREEN } from 'navigation/ScreenNames';
import { setDeviceToken } from 'store/slices/deviceInfo';

export const useTrustDeviceModal = () => {
  const [addTrustedDevice] = useAddTrustedDeviceMutation();
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<MainNavigationProps<'DashboardScreen'>>();
  const { otpCode } = useAppSelector(state => state.userInfo);
  const { savedPasscode } = useKeyChain();
  const { deviceToken: savedDeviceToken } = useAppSelector(state => state.deviceInfo);

  const handleOTPVerification = () => {
    addTrustedDevice({
      headers: {
        'X-Bank-Otp': otpCode,
        'X-Bank-userip': userIp,
        'X-Bank-Getauthmethod': 'false',
        'X-Bank-Sendotp': 'false',
        'X-Bank-Isstrongauthrequest': 'false',
        'X-Bank-DeviceToken': savedDeviceToken,
      },
      Passcode: savedPasscode || '',
      //   Passcode: '11111',
    }).then(res => {
      if ('data' in res) {
        const { accessToken, refreshToken, deviceToken } = res.data;
        if (accessToken && refreshToken) {
          dispatch(
            setUserCredentials({
              accessToken,
              refreshToken,
            }),
          );
        }
        if (deviceToken) {
          dispatch(setDeviceToken(deviceToken));
        }
      }
      closeModal();
    });
  };

  const handlePasscodeSet = (enteredOTP: string) => {
    dispatch(setOTPCode(enteredOTP));
    closeModal();
    navigate(CREATE_PASSCODE_SCREEN);
  };

  const openOTPModal = () => {
    addTrustedDevice({
      headers: {
        'X-Bank-userip': userIp,
        'X-Bank-Getauthmethod': 'true',
        'X-Bank-Sendotp': 'true',
        'X-Bank-Isstrongauthrequest': 'true',
      },
    }).then(res => {
      if ('data' in res) {
        const { deviceToken } = res.data;
        if (deviceToken) {
          dispatch(
            setDeviceToken({
              deviceToken: deviceToken,
            }),
          );
        }
        openModal({
          element: <OTPModalTemp onFinished={handlePasscodeSet} />,
        });
      }
    });
  };

  return {
    openOTPModal,
    handleOTPVerification,
  };
};
