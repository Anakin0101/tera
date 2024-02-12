import {
  RecoverPasswordAPIRequestType,
  RegisterUserAPIRequestType,
} from 'services/apis/authAPI/authAPI.types';

export type RegisterUserStateProps = Pick<RegisterUserAPIRequestType, 'body'>['body'] & {
  flow?: 'registration' | 'passwordRecovery';
};

export type RecoverPasswordStateProps = Pick<RecoverPasswordAPIRequestType, 'body'>['body'] & {
  flow?: 'registration' | 'passwordRecovery';
};

export type CommonStateProps = RegisterUserStateProps & RecoverPasswordStateProps;
