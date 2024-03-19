import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInfoFormData } from './EditUserInfo.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { REGEX } from 'constants/index';
import { openToast } from 'utils/toast';
import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components/modals';
import { useTranslation } from 'react-i18next';
import { useUpdateParametersMutation } from 'services/apis';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import React from 'react';

export const useEditUserInfo = () => {
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const { loginName, secretWord, mobile, address, imageId } = userProfileInfo || {};
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const [isLatin, setIsLatin] = useState(false);
  const [isMinLength, setIsMinLength] = useState<boolean>(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [inputDisplay, setInputDisplay] = useState<boolean>();
  const [updateParameters, { isLoading: updateParametersLoading }] = useUpdateParametersMutation();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserInfoFormData>({
    defaultValues: {
      userName: loginName,
      userEmail: '',
      code: secretWord,
      phone: mobile,
      address: address,
    },
  });
  const { t } = useTranslation();

  const allFields = watch();

  const validateNameInput = (text: string) => {
    setIsLatin(REGEX.LATIN_REGEX.test(text));
    setIsMinLength(text.length >= 6);
    setValue('userName', text, { shouldValidate: true });
  };

  const validateCodewordInput = (text: string) => {
    const validationPassed = REGEX.CODE_WORD.test(text);
    setIsValidCode(validationPassed);
    setValue('code', text, { shouldValidate: true });
  };
  useEffect(() => {
    if (isLatin && isMinLength) {
      setInputDisplay(true);
    } else {
      setInputDisplay(false);
    }
  }, [isLatin, isMinLength]);

  const handleRequestUdateParameters = useCallback(() => {
    updateParameters({
      headers: {
        'X-Bank-UserIp': userIp,
      },
      body: {
        sendOtp: true,
      },
    })
      .unwrap()
      .catch(error => {
        console.warn('Error update Parameters:', error);
        openToast(error?.data?.title?.length ? error?.data?.title : t('newDeposit.error'), 'error');
      });

    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code) {
              updateParameters({
                headers: {
                  'X-Bank-UserIp': userIp,
                },
                body: {
                  address: allFields.address,
                  culture:
                    savedLanguage === LanguageKeys.geo
                      ? LanguageKeyForAPIEnum.KA
                      : LanguageKeyForAPIEnum.EN,
                  email: allFields.userEmail,
                  otp: code,
                  phone: allFields.phone,
                  secretWord: allFields.code,
                  sendOtp: false,
                  userName: allFields.userName,
                },
              })
                .unwrap()
                .then(() => {
                  closeModal();
                  openToast(t('common.successfullyOperation'), 'success');
                })
                .catch(error => {
                  console.warn('Error edir parameters:', error);
                  openToast(
                    error?.data?.title?.length ? error?.data?.title : t('newDeposit.error'),
                    'error',
                  );
                  closeModal();
                });
            }
          }}
        />
      ),
      disablePanning: true,
    });
  }, [t, updateParameters, allFields, savedLanguage, userIp]);

  return {
    control,
    errors,
    loginName,
    isLatin,
    isMinLength,
    imageId,
    isValidCode,
    validateNameInput,
    validateCodewordInput,
    inputDisplay,
    handleSubmit,
    handleRequestUdateParameters,
    updateParametersLoading,
  };
};
