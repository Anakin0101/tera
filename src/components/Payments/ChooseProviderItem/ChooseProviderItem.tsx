import React, { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { useStyles } from './ChooseProviderItem.styles';
import { Text } from 'components/Text/Text';
import { ChooseProviderItemProps } from './ChooseProviderItem.types';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { CHECK_PAYMENT_PROVIDER_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';

export const ChooseProviderItem: React.FC<ChooseProviderItemProps> = memo(
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

    const openChoosePaymentProviderScreen = useCallback(() => {
      navigate(MODAL_STACK, {
        screen: CHECK_PAYMENT_PROVIDER_SCREEN,
        params: { providerItem: item, isAutomaticPayment, basket },
      });
    }, [isAutomaticPayment, item, navigate, basket]);

    return (
      <Pressable
        style={[!isLast && styles.itemWrapperMargin]}
        onPress={openChoosePaymentProviderScreen}
      >
        <View style={styles.itemWrapper}>
          <View style={styles.itemIconWrapper}>
            <IconComponent imageId={item?.largeImageId} customImageIDStyle={styles.iconStyle} />
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
