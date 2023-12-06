import { createSlice } from '@reduxjs/toolkit';
import { DashboardStateProps } from './types';

const initialState: DashboardStateProps = {
  templatesResponse: {
    loading: false,
    error: undefined,
  },
  shouldCloseCards: false,
  scrollToTop: false,
  maskText: false,
  // isCardOpen: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setShouldCloseCards: (state, { payload }) => {
      state.shouldCloseCards = payload;
    },
    setScrollToTop: (state, { payload }) => {
      state.scrollToTop = payload;
    },
    setMaskText: (state, { payload }) => {
      state.maskText = payload;
    },
    // setIsCardOpen: (state, { payload }) => {
    //   state.isCardOpen = payload;
    // },
  },
});

export const {
  setShouldCloseCards,
  setScrollToTop,
  setMaskText,
  //  setIsCardOpen
} = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
