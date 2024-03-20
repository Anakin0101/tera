import React, { FC, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { Colors, FontSize } from 'theme/Variables';
import { InsurancePackageItemProps } from './CardInsuranceScreen.types';
import { useStyles } from './CardInsuranceScreen.styles';
import { TermItem } from './TermItem';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { INSURANCE_PACKAGE_DETAILS } from 'navigation/ScreenNames';
import { useCulture } from 'hooks/useCulture';

export const InsurancePackageItem: FC<InsurancePackageItemProps> = ({ item, activeCard, iban }) => {
  const styles = useStyles();
  const { isGeo } = useCulture();
  const { navigate } = useNavigation<ModalStackScreenProps<'InsurancePackageDetailsScreen'>>();

  const title = useMemo(() => {
    return isGeo ? item?.nameKa : item?.nameEn;
  }, [isGeo, item]);

  const handlePress = useCallback(() => {
    navigate(INSURANCE_PACKAGE_DETAILS, {
      iban,
      activeCard,
      packageName: title,
      commission: item?.serviceFee,
      insuranceTypeId: item?.insuranceTypeId,
    });
  }, [navigate, iban, activeCard, title, item]);

  return (
    <View style={styles.insuranceItem}>
      <Text medium headline children={title} />
      <Text
        children="products.annualFee"
        translateProp={{ value: formatMoney(item?.serviceFee, item?.serviceFeeCurrency) }}
        size={FontSize.regularPlus}
        color={Colors.textBlack500}
        marginTop={5}
      />

      <View style={styles.termsWrapper}>
        <TermItem
          label="products.chipTransactions"
          value={formatMoney(item?.chipTransactions, item?.serviceFeeCurrency)}
        />
        <TermItem
          label="products.internetTransactions"
          value={formatMoney(item?.internetTransactions, item?.serviceFeeCurrency)}
        />
        <TermItem
          label="products.unauthTransactions"
          value={formatMoney(item?.unauthTransactions, item?.serviceFeeCurrency)}
          showDivider={false}
        />
      </View>
      <Button.Primary
        fullWidth
        text={'common.select'}
        customWrapperStyle={styles.button}
        customTextStyle={styles.buttonText}
        onPress={handlePress}
      />
    </View>
  );
};
