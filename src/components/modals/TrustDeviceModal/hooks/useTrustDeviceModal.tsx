import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components/modals';
import { useAddTrustedDeviceMutation } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import React from 'react';
import { setOTPCode, setUserCredentials } from 'store/slices/userInfo';
import { CREATE_PASSCODE_SCREEN } from 'navigation/ScreenNames';
import { setDeviceToken } from 'store/slices/deviceInfo';

export const useTrustDeviceModal = () => {
  const [addTrustedDevice] = useAddTrustedDeviceMutation();
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<ModalStackScreenProps<'CreatePasscodeScreen'>>();
  const { otpCode } = useAppSelector(state => state.userInfo);
  const { deviceToken: savedDeviceToken } = useAppSelector(state => state.deviceInfo);

  const handleOTPVerification = async () => {
    try {
      const res = await addTrustedDevice({
        headers: {
          'X-Bank-Otp': otpCode,
          'X-Bank-userip': userIp,
          'X-Bank-Getauthmethod': 'false',
          'X-Bank-Sendotp': 'false',
          'X-Bank-Isstrongauthrequest': 'false',
          'X-Bank-DeviceToken': savedDeviceToken,
        },
      });

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
    } catch (error) {
      console.error('Error in handleOTPVerification:', error);
    }
  };

  const handlePasscodeSet = (enteredOTP: string) => {
    closeModal();
    dispatch(setOTPCode(enteredOTP));
    navigate(CREATE_PASSCODE_SCREEN);
  };

  const openOTPModal = async () => {
    try {
      const res = await addTrustedDevice({
        headers: {
          'X-Bank-userip': userIp,
          'X-Bank-Getauthmethod': 'true',
          'X-Bank-Sendotp': 'true',
          'X-Bank-Isstrongauthrequest': 'true',
        },
      });

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
          element: <OTPModal onFinished={handlePasscodeSet} />,
          disableDynamicSizing: true,
          disablePanning: true,
        });
      }
    } catch (error) {
      console.error('Error in openOTPModal:', error);
    }
  };

  return {
    openOTPModal,
    handleOTPVerification,
  };
};
