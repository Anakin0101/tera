import { View } from 'react-native';
import { Text } from 'components';
import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { ChangePasswordFormData } from 'screens/ChangePasswordScreen/ChangePasswordScreen.types';
import { Colors } from 'theme/Variables';
import { useStyles } from './PasswordCriteriaList.styles';
import { CheckMark } from 'assets/SVGs';
import { REGEX } from 'constants/regex';

const passwordCriteria = [
  {
    test: (value: string) => value.length >= 6,
    message: 'form.minSymbols',
  },
  {
    test: (value: string) => REGEX.NUMBERS.test(value),
    message: 'form.numbers',
  },
  {
    test: (value: string) => REGEX.LOWECASE_LETTERS.test(value),
    message: 'form.lowercaseLetters',
  },
  {
    test: (value: string) => REGEX.UPPERCASE_LETTERS.test(value),
    message: 'form.upperCaseLetters',
  },
  {
    test: (value: string) => REGEX.SYMBOLS.test(value),
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
  const styles = useStyles();

  const getCriteriaColor = (isMet: boolean, fieldErrors?: FieldErrors<ChangePasswordFormData>) => {
    if (fieldErrors && fieldErrors.newPassword) {
      // for future, if we need to handle red case scenarios
    }
    if (password === '') {
      return Colors.textBlack400;
    }
    return isMet ? Colors.success : Colors.textBlack400;
  };

  return (
    <View style={styles.criteriaContainer}>
      <Text
        children={'changePassword.new_password_criterias'}
        color={Colors.black}
        style={[styles.textStyle, styles.criteriaHeading]}
      />
      {passwordCriteria.map((criteria, index) => (
        <View style={styles.criteria} key={index}>
          <CheckMark color={getCriteriaColor(criteria.test(password))} />
          <Text
            key={index}
            style={[{ color: getCriteriaColor(criteria.test(password), errors) }, styles.textStyle]}
          >
            {criteria.message}
          </Text>
        </View>
      ))}
    </View>
  );
};
