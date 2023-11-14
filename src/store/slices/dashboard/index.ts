import { createSlice } from '@reduxjs/toolkit';
import { DashboardStateProps } from './types';

const initialState: DashboardStateProps = {
  templatesResponse: {
    loading: false,
    error: undefined,
  },
  shouldCloseCards: false,
  scrollToTop: false,
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
  },
});

export const { setShouldCloseCards, setScrollToTop } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
