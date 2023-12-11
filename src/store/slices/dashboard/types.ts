import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type DashboardStateProps = {
  templatesResponse: {
    loading?: any;
    error?: FetchBaseQueryError;
  };
  maskText: boolean;
  shouldCloseCards: boolean;
  scrollToTop: boolean;
  // isCardOpen: boolean;
};
