import React from 'react';
import { FinishScreenContent } from 'components';

export const PaymentErrorScreen = () => {
  return (
    <FinishScreenContent
      isSuccess={false}
      iconSize={80}
      title="teraWallet.success"
      description="common.seeContract"
      ctaTEXT="common.returnToMain"
    />
  );
};
