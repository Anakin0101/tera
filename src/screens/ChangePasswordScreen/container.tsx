import { OTPModal } from 'components/modals';
import { useCulture } from 'hooks/useCulture';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangePasswordMutation } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { closeModal, openModal } from 'utils/modal';
import { openToast } from 'utils/toast';

/**
 * Provides a custom hook for changing the user's password, handling both the initial change request and the optional OTP verification step.
 *
 * This hook encapsulates the logic for sending a change password request to the server, including handling cases where OTP (One-Time Password)
 * verification is required due to security policies. It utilizes several hooks and services to manage the process, including:
 * - Retrieving user and device information from the Redux store.
 * - Utilizing the `useCulture` hook for internationalization support.
 * - Using the `useChangePasswordMutation` service to send change password requests.
 * - Displaying modals and toasts for user feedback and interaction.
 *
 * @returns An object containing:
 * - `handleChangePassword`: A function that initiates the password change process, accepting an object with `existingPassword` and `newPassword` strings.
 *   This function handles the logic to call the change password API, manage OTP modal if required, and provide feedback to the user via toasts.
 * - `changePasswordLoading`: A boolean indicating if the change password request is currently being processed.
 *
 * @example
 * const { handleChangePassword, changePasswordLoading } = useChangePassword();
 * handleChangePassword({ existingPassword: 'oldPass123', newPassword: 'newPass456' });
 */

export const useChangePassword = () => {
  const {
    userIp,
    isDeviceTrusted: { isTrusted },
  } = useAppSelector(state => state.deviceInfo);

  const { culture } = useCulture();
  const [changePassword, { isLoading: changePasswordLoading }] = useChangePasswordMutation();
  const { t } = useTranslation();

  const attemptChangePassword = useCallback(
    async ({
      existingPassword,
      newPassword,
      otpCode = '',
    }: {
      existingPassword: string;
      newPassword: string;
      otpCode?: string;
    }) => {
      let headers = {
        'X-Bank-UserIp': userIp || '',
        'X-Bank-Sendotp': isTrusted ? 'false' : 'true',
        ...(otpCode ? { 'X-Bank-Otp': otpCode } : {}),
      };

      let body = {
        culture,
        existingPassword,
        newPassword,
      };

      try {
        const response = await changePassword({ headers, body });
        return response;
      } catch (err) {
        console.warn('Error during changePassword:', err);
        throw err;
      }
    },
    [changePassword, culture, isTrusted, userIp],
  );

  const handleChangePassword = useCallback(
    async ({
      existingPassword,
      newPassword,
    }: {
      existingPassword: string;
      newPassword: string;
    }) => {
      try {
        const response = await attemptChangePassword({
          existingPassword,
          newPassword,
        });

        if (response && 'data' in response && response.data.success) {
          if (response.data.otpRequired) {
            // Back-end bug. even when device is trusted, otpRequired is returned as "true" - FIX - DEA
            openModal({
              element: (
                <OTPModal
                  onFinished={async code => {
                    closeModal();
                    try {
                      const retryResponse = await attemptChangePassword({
                        existingPassword,
                        newPassword,
                        otpCode: code,
                      });

                      if (retryResponse && 'data' in retryResponse) {
                        if (retryResponse.data.success) {
                          openToast(t('changePassword.change_password_success'), 'success');
                        }
                        if (retryResponse.data.error) {
                          openToast(String(retryResponse.data.error), 'error');
                        }
                      }
                    } catch (retryError) {
                      openToast('Error during password change with OTP', 'error');
                    }
                  }}
                />
              ),
              disableDynamicSizing: true,
              disablePanning: true,
              withKeyboard: true,
            });
          } else {
            openToast(t('changePassword.change_password_success'), 'success');
          }
        } else {
          openToast(t('changePassword.change_password_error'), 'error');
        }
      } catch (err) {
        openToast('Error during initial password change attempt', 'error');
      }
    },
    [attemptChangePassword, t],
  );

  return {
    handleChangePassword,
    changePasswordLoading,
  };
};
