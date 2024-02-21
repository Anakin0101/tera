import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  accountFromData: null,
  accountToData: null,
  convertionData: null,
  selectedData: '',
  selectedOtherBankDataTitle: '',
  selectedPrice: 0,
  receiverInfo: null,
  receiverName: '',
  otpData: null,
  selectedIban: null,
  invoiceData: null,
  savedTemplateForIban: null,
  accountIban: null,
  selectedTransactionType: {
    name: '',
    isFast: null,
    selected: null,
  },
  setBudgetPerson: {
    payerCode: '',
    payerName: '',
    payForSomeone: false,
  },
  wrappedCode: null,
  treasuryFromCode: null,
  currentTransfer: {
    id: null,
    name: '',
    type: 1,
    conversion: null,
    internal: null,
    bankInternal: null,
    budget: null,
    bankExternal: null,
    mobilePayment: null,
    p2pTransfers: null,
  },
  isInternal: false,
};
interface SetTransferTypePayload {
  id?: null;
  name?: string;
  type?: number;
}
type TransferDataType =
  | 'conversion'
  | 'internal'
  | 'bankInternal'
  | 'budget'
  | 'bankExternal'
  | 'mobilePayment'
  | 'p2pTransfers';
interface SetSpecificTransferDataPayload {
  transferType: TransferDataType;
  data: any;
}

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    setAccountFromData: (state, { payload }) => {
      state.accountFromData = payload;
    },
    setAccountToData: (state, { payload }) => {
      state.accountToData = payload;
    },
    setAccountIban: (state, { payload }) => {
      state.accountIban = payload;
    },
    clearAccountFromData: state => {
      state.accountFromData = null;
    },
    clearAccountToData: state => {
      state.accountToData = null;
    },

    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
    setSelectedOtherBankDataTitle: (state, action) => {
      state.selectedOtherBankDataTitle = action.payload;
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    setConvertionData: (state, action) => {
      state.convertionData = action.payload;
    },
    setReceiverInfo: (state, action) => {
      state.receiverInfo = action.payload;
    },
    setReceiverName: (state, action) => {
      state.receiverName = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setOtpData: (state, action) => {
      state.otpData = action.payload;
    },
    setSelectedIban: (state, action) => {
      state.selectedIban = action.payload;
    },
    clearSelectedData: state => {
      state.selectedData = '';
    },
    setTemplateForIban: (state, action) => {
      state.savedTemplateForIban = action.payload;
    },
    clearTemplate: state => {
      state.savedTemplateForIban = null;
    },
    setSelectedTransactionType: (state, action) => {
      state.selectedTransactionType = action.payload;
    },
    setBudgetPerson: (state, action) => {
      state.setBudgetPerson = action.payload;
    },
    setWrappedCode: (state, action) => {
      state.wrappedCode = action.payload;
    },
    setClearWrappedCode: state => {
      state.wrappedCode = null;
    },
    setTreasuryFromCode: (state, action) => {
      state.treasuryFromCode = action.payload;
    },
    setClearTreasuryFromCode: state => {
      state.treasuryFromCode = null;
    },
    setTransferType: (state, action: PayloadAction<SetTransferTypePayload>) => {
      const { id, name, type } = action.payload;
      state.currentTransfer = {
        ...state.currentTransfer,
        id: id !== undefined ? id : state.currentTransfer.id,
        name: name !== undefined ? name : state.currentTransfer.name,
        type: type !== undefined ? type : state.currentTransfer.type,
      };
    },
    setSpecificTransferData: (state, action: PayloadAction<SetSpecificTransferDataPayload>) => {
      const { transferType, data } = action.payload;
      state.currentTransfer[transferType] = data;
    },
    clearCurrentTransfer: () => {
      return initialState;
    },
    setIsInternal: (state, action) => {
      state.isInternal = action.payload;
    },
  },
});

export const {
  setAccountFromData,
  setAccountToData,
  clearAccountFromData,
  clearAccountToData,
  setSelectedPrice,
  setConvertionData,
  setReceiverInfo,
  setOtpData,
  setSelectedIban,
  setSelectedData,
  setInvoiceData,
  clearSelectedData,
  setTemplateForIban,
  clearTemplate,
  setAccountIban,
  setSelectedTransactionType,
  setSelectedOtherBankDataTitle,
  setBudgetPerson,
  setWrappedCode,
  setTreasuryFromCode,
  setClearTreasuryFromCode,
  setClearWrappedCode,
  setTransferType,
  setSpecificTransferData,
  clearCurrentTransfer,
  setIsInternal,
  setReceiverName,
} = transfersSlice.actions;
export const transfersReducer = transfersSlice.reducer;
