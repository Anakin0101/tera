export type GetUserInfoAPIResponseType = {
  loginName: string | null;
  customerId: number;
  personalId: string | null;
  firstName: string;
  firstNameEng: string;
  lastName: string;
  lastNameEng: string;
  mobile: string | null;
  email: string | null;
  address: string;
  addressEng: string;
  addressJuridical: string;
  addressJuridicalEng: string;
  imageId: string;
  authType: number;
  packageType: number;
  showZeroAccounts: boolean;
  hasDigipass: boolean;
  isPensionGranted: boolean;
  isAdult: boolean;
  showPension: boolean;
  mustChangePassword: boolean;
  passwordExpired: boolean;
  createdAutomatically: boolean;
  secretWord: string;
};

export type GetTotalSavingRequestType = {
  culture: string;
};
export type GetTotalSavingResponseType = {
  totalSaving: number;
};

export type GetUnreadNotificationsCountRequestType = {
  culture: string;
  personalId: string;
};

export type GetUnreadNotificationsCountResponseType = {
  status: string;
  code: number;
  message: string;
  data: {
    notReadCount: number;
    notReadCountObligatory: number;
  };
};

export type AtmsResponse = {
  id: number;
  addresGeo: string;
  addresEng: string;
  descriptionGeo: string;
  descriptionEng: string;
  latitude: number;
  longitude: number;
  isActive: true;
  isExternal: false;
  distance: number;
};

export type ServiceCentersResponse = {
  id: number;
  addresGeo: string;
  addresEng: string;
  descriptionGeo: string;
  descriptionEng: string;
  latitude: number;
  longitude: number;
  isActive: true;
};

export type UpdateParametersRequestType = {
  culture?: string;
  userName?: string | null;
  email?: string;
  secretWord?: string | undefined;
  phone?: string | null;
  address?: string | undefined;
  sendOtp?: boolean;
  otp?: string;
};

export type UpdateParametersRespType = {
  title: string;
  status: number;
  detail: string;
};

export type UpdateUserProfileRequestType = {
  image?: string;
  culture?: string;
};
