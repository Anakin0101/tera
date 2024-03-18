import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInfoFormData } from './EditUserInfo.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { REGEX } from 'constants/index';
import { Alert } from 'react-native';

export const useEditUserInfo = () => {
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const { firstName = '', lastName = '', imageId } = userProfileInfo || {};
  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
  const [isLatin, setIsLatin] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [codeInputValue, setCodeInputValue] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);
  const [inputDisplay, setInputDisplay] = useState<boolean>();
  const {
    control,
    // setValue,
    formState: { errors },
  } = useForm<UserInfoFormData>({
    defaultValues: {
      userName: '',
      userEmail: '',
      code: '',
      phone: '',
      address: '',
    },
  });

  const validateNameInput = (text: string) => {
    setIsLatin(REGEX.LATIN_REGEX.test(text));
    setIsMinLength(text.length >= 6);
    setInputValue(text);
  };

  const validateCodewordInput = (text: string) => {
    const validationPassed = REGEX.CODE_WORD.test(text);
    setIsValidCode(validationPassed);
    setCodeInputValue(text);
  };
  useEffect(() => {
    if (isLatin && isMinLength) {
      setInputDisplay(true);
    } else {
      setInputDisplay(false);
    }
  }, [isLatin, isMinLength, inputValue]);

  const onSubmit = () => {
    Alert.alert('open OTP MODAL');
  };

  return {
    control,
    errors,
    fullName,
    isLatin,
    isMinLength,
    inputValue,
    imageId,
    codeInputValue,
    isValidCode,
    validateNameInput,
    validateCodewordInput,
    inputDisplay,
    onSubmit,
  };
};
