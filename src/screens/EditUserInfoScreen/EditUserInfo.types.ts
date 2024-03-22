export type UserInfoFormData = {
  userName: string | null;
  userEmail: string;
  code: string | undefined;
  phone: string | null;
  address: string | undefined;
};

export type ModalPropsType = {
  onPress: (isDelete: boolean) => void;
};
