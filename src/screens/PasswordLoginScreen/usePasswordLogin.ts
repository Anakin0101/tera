import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from './PasswordLoginScreen.types';
import { useEffect, useState } from 'react';
import { openToast } from 'utils/toast';

const defaultValues: DefaultValues<FormValues> = {
  username: '',
  password: '',
  save: false,
};

const getErrorMessage = (attempt: number): string => {
  switch (attempt) {
    case 1:
    case 2:
    case 3:
      return 'common:authErrors.tryAgain';
    case 4:
      return 'common:authErrors.blockWarning';
    case 5:
      return 'common:authErrors.tempBlocked';
    case 6:
      return 'common:authErrors.lastWarning';
    case 7:
      return 'common:authErrors.blocked';
    default:
      return '';
  }
};

export const usePasswordLogin = () => {
  const [attempts, setAttempts] = useState(0);
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
  });

  useEffect(() => {
    if (attempts) {
      const height = attempts === 6 ? 130 : 90;
      openToast(getErrorMessage(attempts), 'error', height);
    }
  }, [attempts]);

  const onSubmit: SubmitHandler<FormValues> = () => {
    if (attempts < 7) {
      setAttempts(prev => prev + 1);
    }
  };

  const handleSignIn = handleSubmit(onSubmit);

  const handleSignUp = () => {};

  return {
    control,
    handleSignIn,
    handleSignUp,
  };
};
