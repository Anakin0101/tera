import { GetUserInfoAPIResponseType } from 'services/apis/profileAPI/profileAPI.types';

export type ProfileStateProps = {
  userProfileInfo: GetUserInfoAPIResponseType | undefined;
};
