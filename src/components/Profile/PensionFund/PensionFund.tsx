import { Text } from 'components/Text/Text';
import React from 'react';
import { formatMoney } from 'utils/formatMoney';
import { useStyleTheme } from './PensionFund.styles';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const PensionFund = ({
  totalSaving,
  showPensionFund,
}: {
  totalSaving?: number;
  showPensionFund: boolean;
}) => {
  const styles = useStyleTheme();
  return showPensionFund && totalSaving ? (
    <Text
      children={`${formatMoney(Number(totalSaving), CurrencyEnum.GEL)}`}
      style={styles.pensionFund}
      ellipsizeMode="tail"
      numberOfLines={1}
    />
  ) : null;
};
