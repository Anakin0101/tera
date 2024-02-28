import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { DepositSliderItemProps } from './DepositDetailsScreen.types';
import { useStyles } from './DepositDetailsScreen.styles';
import { useCulture } from 'hooks/useCulture';
import { LanguageKeyForAPIEnum } from 'components/LanguageSwitcher/LanguageSwitcher.types';

export const DepositSliderItem: FC<DepositSliderItemProps> = ({ item }) => {
  const styles = useStyles();
  const { culture } = useCulture();

  const title = useMemo(() => {
    if (item?.depositName) {
      return culture === LanguageKeyForAPIEnum.KA ? item?.depositName : item?.depositNameEng;
    }
    return culture === LanguageKeyForAPIEnum.KA ? item?.depositType : item?.depositTypeEng;
  }, [item, culture]);

  return (
    <View style={[styles.card, styles.depositItem]}>
      <View style={styles.header}>
        <Text children={title} center color={Colors.inactiveTint} />
        <Text
          children={formatMoney(item?.amount, item?.currency)}
          size={30}
          lineHeight={34}
          medium
        />
      </View>
      <View style={styles.footer}>
        <Text children={'deposits.accruedBenefit'} label color={Colors.textBlack500} />
        <Text
          label
          medium
          color={Colors.success}
          children={` +${formatMoney(item?.totalInterest, item?.currency)}`}
        />
      </View>
    </View>
  );
};
