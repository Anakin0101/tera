import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { useStyles } from './CurrencyConversion.styles';
import { CurrencyConversionProps } from './CurrencyConversion.types';
import { CurrencyConversionItem } from './CurrencyConversionItem';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const CurrencyConversion: React.FC<CurrencyConversionProps> = memo(
  ({ transferResponse, buyDetails, setBuyDetails }) => {
    const styles = useStyles();

    const filteredCurrencies = useMemo(() => {
      return Object.values(CurrencyEnum).filter(item => item !== transferResponse.currency);
    }, [transferResponse]);

    const renderContent = useCallback(() => {
      return filteredCurrencies.map((item, index) => {
        return (
          <CurrencyConversionItem
            isFirst={index === 0}
            key={index.toString()}
            currentCurrency={item}
            transferResponse={transferResponse}
            buyDetails={buyDetails}
            setBuyDetails={setBuyDetails}
          />
        );
      });
    }, [buyDetails, filteredCurrencies, setBuyDetails, transferResponse]);

    return <View style={styles.wrapper}>{renderContent()}</View>;
  },
);
