import React from 'react';
import { useStyles } from './AccountExtractionModal.styles';
import { NoTransactions } from 'components';

export const EmptyComponent = () => {
  const styles = useStyles();
  return <NoTransactions containerStyle={styles.noTransactionsWrapper} text="products.emptyOps" />;
};
