import React, { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { useStyles } from './ChoosePaymentItem.styles';
import { Text } from 'components/Text/Text';
import { ChoosePaymentItemProps } from './ChoosePaymentItem.types';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { CHOOSE_PAYMENT_PROVIDER_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';

export const ChoosePaymentItem: React.FC<ChoosePaymentItemProps> = memo(
  ({ item, isLast = false, isAutomaticPayment, basket }) => {
    const styles = useStyles();
    const savedLanguage = getValue(SELECTED_LANGUAGE);
    const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

    const renderText = useCallback(() => {
      if (savedLanguage === LanguageKeys.geo) {
        return item?.name?.ka;
      } else {
        return item?.name?.en;
      }
    }, [item?.name?.en, item?.name?.ka, savedLanguage]);

    // providerInfo
    const openChoosePaymentProviderScreen = useCallback(() => {
      navigate(MODAL_STACK, {
        screen: CHOOSE_PAYMENT_PROVIDER_SCREEN,
        params: { providerInfo: item, isAutomaticPayment, basket },
      });
    }, [basket, isAutomaticPayment, item, navigate]);

    return (
      <Pressable
        style={[!isLast && styles.itemWrapperMargin]}
        onPress={openChoosePaymentProviderScreen}
      >
        <View style={styles.itemWrapper}>
          <View style={styles.itemIconWrapper}>
            <IconComponent imageId={item?.imageId} customImageIDStyle={styles.iconStyle} />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.itemTitle}>{renderText()}</Text>
          </View>
        </View>
        {!isLast && <View style={styles.contentBorder} />}
      </Pressable>
    );
  },
);
