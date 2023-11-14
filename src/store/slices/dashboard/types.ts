import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type DashboardStateProps = {
  templatesResponse: {
    loading?: any;
    error?: FetchBaseQueryError;
  };
  shouldCloseCards: boolean;
  scrollToTop: boolean;
};
