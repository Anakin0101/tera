export interface PersonalNumberAccount {
  accountIban: string;
  accountId: number;
  currency: string;
  name: string;
  nameEng: string;
}
export type Account = {
  accountId: number;
  accountIban: string;
  currency: string;
  name: string;
  nameEng: string;
};

export type RecepientNumberType = {
  RecepientNumber: string;
};
