import React, { FC, memo } from 'react';
import { OfficialRateSignProps } from './ExchangeRatesScreen.types';
import { ChevronDown, ChevronUp } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

export const OfficialRateSign: FC<OfficialRateSignProps> = memo(({ buy }) => {
  return buy > 0 ? (
    <ChevronUp color={Colors.success} width={12} height={12} />
  ) : (
    <ChevronDown color={Colors.error} width={12} height={12} />
  );
});
