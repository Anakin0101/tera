import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApplicationErrors, ApplicationStateProps, ModalStateProps } from './types';

const initialState: ApplicationStateProps = {
  applicationError: {
    isErrorFallback: false,
  },
  modalState: {
    isClosed: false,
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
    setIsModalClosedState: (state, action: PayloadAction<ModalStateProps>) => {
      state.modalState = {
        ...state.modalState,
        ...action.payload,
      };
    },
    resetModalState: state => {
      state.modalState = initialState.modalState;
    },
  },
});

export const {
  resetApplicationState,
  setApplicationError,
  clearApplicationError,
  setIsModalClosedState,
  resetModalState,
} = applicationStateSlice.actions;
export const applicationStateReducer = applicationStateSlice.reducer;
