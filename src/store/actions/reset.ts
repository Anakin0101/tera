import { createAction } from '@reduxjs/toolkit';

export const RESET_STATE_ACTION_TYPE = 'resetState';
export const PURGE_PERSISTED_STATE_ACTION_TYPE = 'purgePersistedState';

export const resetStateAction = createAction(RESET_STATE_ACTION_TYPE, () => ({ payload: null }));

// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
export const purgePersistedStateAction = createAction(PURGE_PERSISTED_STATE_ACTION_TYPE, () => ({
  payload: null,
}));
