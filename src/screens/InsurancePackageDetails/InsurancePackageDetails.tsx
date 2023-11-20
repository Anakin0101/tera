import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Divider, Text } from 'components';
import { DetailsItem } from 'screens/AccountDetailsScreen/DetailsItem';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { CardSliderItem } from 'components/CardsAndAccountsSlider/CardSliderItem';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './InsurancePackageDetails.styles';

export const InsurancePackageDetails = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { params } = useRoute<ProductsStackRouteProps<'InsurancePackageDetailsScreen'>>();
  const [agreed, setAgreed] = useState(false);
  const { cards } = useAppSelector(state => state.products);
  const card = cards.find(item => item.id === params.cardId);

  if (!card) {
    return null;
  }

  return (
    <ScrollView bounces={false} style={styles.scrollView}>
      <View style={styles.cardContainer}>
        <CardSliderItem item={card} />
      </View>
      <View style={styles.info}>
        <Text children="products.info" medium size={18} />
        <DetailsItem label="products.package" value={params.packageName} />
        <DetailsItem label="products.commission" value={formatMoney(params.commission)} />
        <DetailsItem label="products.account" value={String(card.accountNumber)} />
      </View>
      <Divider height={1} />
      <View style={styles.footer}>
        <View style={styles.agreementContainer}>
          <Checkbox isChecked={agreed} onChange={setAgreed} />
          <Pressable style={styles.agreement}>
            <Text label color={Colors.textBlack400} lineHeight={22}>
              {t('products.agree')}
              <Text label special lineHeight={22} children={'products.standardConditions'} />
            </Text>
          </Pressable>
        </View>
        <Button.Primary
          text="products.select"
          customWrapperStyle={styles.button}
          customTextStyle={styles.buttonText}
          fullWidth
        />
      </View>
    </ScrollView>
  );
};
