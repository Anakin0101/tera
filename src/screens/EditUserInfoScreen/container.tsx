import React, { useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInfoFormData } from './EditUserInfo.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { REGEX } from 'constants/index';
import { openToast } from 'utils/toast';
import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components/modals';
import { useTranslation } from 'react-i18next';
import {
  useGetUserProfileInfoQuery,
  useUpdateParametersMutation,
  useUpdateUserProfileImageMutation,
} from 'services/apis';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { launchImageLibrary } from 'react-native-image-picker';
import { DefaultImage, ImageConfig, checkPhotoLibraryPermissions } from './utilis';
import { UpdateProfileModal } from './UpdateProfileModal';

export const useEditUserInfo = () => {
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const {
    loginName,
    secretWord,
    mobile,
    address,
    imageId,
    firstName = '',
    lastName = '',
  } = userProfileInfo || {};

  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const [isLatin, setIsLatin] = useState(false);
  const [isMinLength, setIsMinLength] = useState<boolean>(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [inputDisplay, setInputDisplay] = useState<boolean>();
  const [updateParameters, { isLoading: updateParametersLoading }] = useUpdateParametersMutation();
  const { refetch: refetchUserProfile } = useGetUserProfileInfoQuery();
  const [updateUserProfileImage] = useUpdateUserProfileImageMutation();
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
                  refetchUserProfile();
                })
                .catch(error => {
                  console.warn('Error edit parameters:', error);
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
  }, [t, updateParameters, allFields, savedLanguage, userIp, refetchUserProfile]);

  const prepareFormData = useCallback((imageUri: string, savedLanguage: string | undefined) => {
    const formData = new FormData();
    formData.append('image', {
      name: 'profile.jpg',
      type: 'image/jpeg',
      uri: imageUri,
    });
    formData.append(
      'culture',
      savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    );
    return formData;
  }, []);

  const performImageUpdate = useCallback(
    async (formData: any) => {
      await updateUserProfileImage({
        headers: {
          'X-Bank-UserIp': userIp,
        },
        body: formData,
      });
      closeModal();
      refetchUserProfile();
      openToast(t('settings.changePhoto'), 'success');
    },
    [updateUserProfileImage, refetchUserProfile, userIp, t],
  );

  const onChoosePhoto = useCallback(
    async (isDelete?: boolean) => {
      try {
        if (isDelete) {
          const formData = prepareFormData(`data:image/png;base64,${DefaultImage}`, savedLanguage);
          await performImageUpdate(formData);
          return;
        }
        const hasPermission = await checkPhotoLibraryPermissions();
        if (!hasPermission) return;
        const result = await launchImageLibrary({ ...ImageConfig });
        if (result.assets) {
          const { base64 } = result.assets[0];
          const imageData = `data:image/png;base64,${base64}`;
          const formData = prepareFormData(imageData, savedLanguage);
          await performImageUpdate(formData);
        }
      } catch (error) {
        console.warn('Error during photo selection or upload:', error);
      }
    },
    [prepareFormData, performImageUpdate, savedLanguage],
  );
  const onProfileImagePress = useCallback(() => {
    openModal({
      element: <UpdateProfileModal onPress={onChoosePhoto} />,
      title: t('settings.changePhotoTitle'),
      titlePosition: 'left',
      disableDynamicSizing: false,
    });
  }, [onChoosePhoto, t]);

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
    onChoosePhoto,
    onProfileImagePress,
    fullName,
  };
};
