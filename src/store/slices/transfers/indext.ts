import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountFromData: null,
  accountToData: null,
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
  },
});

export const { setAccountFromData, setAccountToData, clearAccountFromData, clearAccountToData } =
  transfersSlice.actions;
export const transfersReducer = transfersSlice.reducer;
