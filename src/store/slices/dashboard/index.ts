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
  },
});

export const { setShouldCloseCards, setScrollToTop, setMaskText } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
