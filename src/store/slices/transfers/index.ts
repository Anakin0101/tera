import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountFromData: null,
  accountToData: null,
  convertionData: null,
  selectedData: '',
  selectedOtherBankDataTitle: '',
  selectedPrice: 0,
  receiverInfo: null,
  otpData: null,
  selectedIban: null,
  invoiceData: null,
  savedTemplateForIban: null,
  accountIban: null,
  selectedTransactionType: {
    name: 'სტანდარტული გადარიცხვა',
    isFast: false,
    selected: 1,
  },
};

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
} = transfersSlice.actions;
export const transfersReducer = transfersSlice.reducer;
