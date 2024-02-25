import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApplicationErrors, ApplicationStateProps } from './types';

const initialState: ApplicationStateProps = {
  applicationError: {
    isErrorFallback: false,
  },
};

const applicationStateSlice = createSlice({
  name: 'applicationState',
  initialState,
  reducers: {
    resetApplicationState: () => initialState,
    setApplicationError: (state, action: PayloadAction<ApplicationErrors>) => {
      state.applicationError = {
        ...state.applicationError,
        ...action.payload,
      };
    },
    clearApplicationError: state => {
      state.applicationError = initialState.applicationError;
    },
  },
});

export const { resetApplicationState, setApplicationError, clearApplicationError } =
  applicationStateSlice.actions;
export const applicationStateReducer = applicationStateSlice.reducer;
