import { View } from 'react-native';
import { Text } from 'components';
import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { ChangePasswordFormData } from 'screens/ChangePasswordScreen/ChangePasswordScreen.types';

const passwordCriteria = [
  {
    test: (value: string) => value.length >= 6,
    message: 'form.minSymbols',
  },
  {
    test: (value: string) => /\d/.test(value),
    message: 'form.numbers',
  },
  {
    test: (value: string) => /[a-z]/.test(value),
    message: 'form.lowercaseLetters',
  },
  {
    test: (value: string) => /[A-Z]/.test(value),
    message: 'form.upperCaseLetters',
  },
  {
    test: (value: string) => /[$%^&*]/.test(value),
    message: 'form.symbols',
  },
];

export const PasswordCriteriaList = ({
  password = '',
  errors,
}: {
  password: string;
  errors: FieldErrors<ChangePasswordFormData>;
}) => {
  const getCriteriaColor = (isMet: boolean, fieldErrors: FieldErrors<ChangePasswordFormData>) => {
    if (fieldErrors && fieldErrors.newPassword) {
      //   return 'red';
    }
    if (password === '') {
      return 'black';
    }
    return isMet ? 'green' : 'black';
  };

  return (
    <View>
      {passwordCriteria.map((criteria, index) => (
        <Text key={index} style={{ color: getCriteriaColor(criteria.test(password), errors) }}>
          {criteria.message}
        </Text>
      ))}
    </View>
  );
};
