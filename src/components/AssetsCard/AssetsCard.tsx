import React from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './AssetsCard.styles';
import Images from 'theme/Images';
import { AssetsCardProps } from './AssetsCard.types';
import { useTranslation } from 'react-i18next';
import { CardItem } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DEPOSITS_SCREEN, LOANS_SCREEN, PRODUCTS_STACK } from 'navigation/ScreenNames';
import { ProductsStackParamsList } from 'navigation/types';

export const AssetsCard: React.FC<AssetsCardProps> = ({ assetsSum, totalSum, currency }) => {
  const securePension = useAppSelector(state => state.dashboard.maskDebit);
  const { t } = useTranslation();
  const { navigate } = useNavigation<BottomTabNavigationProp<ProductsStackParamsList | any>>();
  const renderMaskedValue = (value: number) => {
    const stringValue = String(value);
    const maskedValue = stringValue.replace(/./g, '•');
    return securePension ? maskedValue : stringValue;
  };
  const styles = useStyles();
  const goToDepositsScreen = () => {
    navigate(PRODUCTS_STACK, { screen: DEPOSITS_SCREEN, initial: false });
  };
  const goToLoansScreen = () => {
    navigate(PRODUCTS_STACK, { screen: LOANS_SCREEN, initial: false });
  };

  return (
    <Pressable style={styles.templateCardContainer}>
      <CardItem
        title={t('products.allDeposits')}
        isSecure
        value={renderMaskedValue(assetsSum)}
        iconSource={Images().AssetsIcon}
        currency={currency}
        onPress={goToDepositsScreen}
      />
      <View style={styles.underline} />
      {totalSum !== 0 ? (
        <CardItem
          isSecure
          title={t('loans.title')}
          value={renderMaskedValue(totalSum)}
          iconSource={Images().LiabilitiesIcon}
          currency={currency}
          onPress={goToLoansScreen}
        />
      ) : null}
    </Pressable>
  );
};
