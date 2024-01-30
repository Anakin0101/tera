import { RegisterUserAPIRequestType } from 'services/apis/authAPI/authAPI.types';

export type RegisterUserStateProps = Pick<RegisterUserAPIRequestType, 'body'>['body'] & {
  flow?: 'registration' | 'passwordRecovery';
};
