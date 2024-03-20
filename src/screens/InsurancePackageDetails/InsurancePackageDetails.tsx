import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Divider, Text } from 'components';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useInsurancePackageDetails } from './container';
import { formatMoney } from 'utils/formatMoney';
import { CardSliderItem } from 'screens/CardDetailsScreen/CardSliderItem';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { useStyles } from './InsurancePackageDetails.styles';

export const InsurancePackageDetails = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { packageName, commission, agreed, setAgreed, activeCard, handlePress, iban } =
    useInsurancePackageDetails();

  if (!activeCard) {
    return <View />;
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.cardContainer}>
        <CardSliderItem item={activeCard} />
      </View>
      <View style={styles.info}>
        <Text children="products.info" medium size={18} />
        <DetailsItem label="products.package" value={packageName} />
        <DetailsItem
          label="products.commission"
          value={formatMoney(commission, CurrencyEnum.GEL)}
        />
        <DetailsItem label="products.account" value={iban} />
      </View>
      <Divider height={1} />
      <View style={styles.footer}>
        <View style={styles.agreementContainer}>
          <Checkbox isChecked={agreed} onChange={setAgreed} />
          <Pressable style={styles.agreement}>
            <Text label secondary lineHeight={22}>
              {t('products.agree')}
              <Text label special lineHeight={22} children={'products.standardConditions'} />
            </Text>
          </Pressable>
        </View>
        <Button.Primary
          fullWidth
          text="common.select"
          onPress={handlePress}
          customWrapperStyle={[styles.button, !agreed && styles.disabled]}
          customTextStyle={[styles.buttonText]}
        />
      </View>
    </ScrollView>
  );
};
