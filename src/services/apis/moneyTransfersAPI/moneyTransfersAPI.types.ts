export interface ReceiverTsMTSystemsResponse {
  success: boolean;
  mtSystem: Array<ReceiverMtSystem>;
  error?: string;
  pending?: boolean;
  transferSendPrepareResponse?: any;
  invalidReceiveCountry?: boolean;
  errorMessage?: string;
}

export interface ReceiverMtSystem {
  currencies: Array<Currency>;
  mtSystem: any; // აქ არ ვიცი რა ბრუნდება
  skipSendCountrySelection: boolean;
  key?: string;
  name?: string;
}

export interface Currency {
  code: string;
  receiveMaxAmount: number;
  receiveMaxAmountSpecified: boolean;
}

export interface FindTransferRequestParams {
  channelCode: string;
  mtSystem: string;
  transferNumber: string;
  currency?: string;
}

export interface FindTransferResponse {
  success: boolean;
  amount: number;
  countryCode: string;
  currency: string;
  receiverFirstName: string;
  receiverLastName: string;
  senderFirstName: string;
  senderLastName: string;
  errorMessage: string;
}
