import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountFromData: null,
  accountToData: null,
  convertionData: null,
  selectedData: '',
  selectedPrice: 0,
  receiverInfo: null,
  otpData: null,
  selectedIban: null,
  invoiceData: null,
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
    clearAccountFromData: state => {
      state.accountFromData = null;
    },
    clearAccountToData: state => {
      state.accountToData = null;
    },

    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
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
} = transfersSlice.actions;
export const transfersReducer = transfersSlice.reducer;
