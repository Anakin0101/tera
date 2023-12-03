import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountFromData: null,
  accountToData: null,
  selectedItem: {
    id: 1,
    name: 'პირადი გადარიცხვა',
  },
  selectedData: null,
  selectedPrice: 0,
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
    setSelectedTransferItem: (state, action) => {
      state.selectedItem = action.payload;
      if (action.payload.id === 4) {
        state.selectedData = action.payload.otherValue || null;
      } else {
        state.selectedData = null;
      }
    },
    clearSelectedItem: state => {
      state.selectedItem = {
        id: 1,
        name: 'პირადი გადარიცხვა',
      };
      state.selectedData = null;
    },
    setOtherValueForID4: (state, action) => {
      if (state.selectedItem.id === 4) {
        state.selectedData = action.payload.otherValue || null;
      }
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
  },
});

export const {
  setAccountFromData,
  setAccountToData,
  clearAccountFromData,
  clearAccountToData,
  setSelectedTransferItem,
  clearSelectedItem,
  setOtherValueForID4,
  setSelectedPrice,
} = transfersSlice.actions;
export const transfersReducer = transfersSlice.reducer;
