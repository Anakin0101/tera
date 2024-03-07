import React, { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useStyles } from './ChooseTransferItem.styles';
import { Text } from 'components/Text/Text';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { MainStackScreenProps } from 'navigation/types';
import { CHECK_MONEY_TRANSFER_PROVIDER_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { ChooseTransferItemProps } from './ChooseTransferItem.types';
import Images from 'theme/Images';

export const ChooseTransferItem: React.FC<ChooseTransferItemProps> = memo(
  ({ item, isLast = false }) => {
    const styles = useStyles();
    const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

    const openChoosePaymentProviderScreen = useCallback(() => {
      navigate(MODAL_STACK, {
        screen: CHECK_MONEY_TRANSFER_PROVIDER_SCREEN,
        params: { providerItem: item },
      });
    }, [item, navigate]);

    const getCurrentImage = () => {
      const images: any = Images();
      return images[item.key] || null;
    };

    return (
      <Pressable style={styles.itemWrapperMargin} onPress={openChoosePaymentProviderScreen}>
        <View style={styles.itemWrapper}>
          <View style={styles.itemIconWrapper}>
            <IconComponent
              pngLocalIcon={getCurrentImage()}
              pngLocalIconCustomStyle={styles.iconStyle}
              hasBorder={false}
            />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.itemTitle} children={`moneyTransferReceiveScreen.${item.key}`} />
          </View>
        </View>
        {!isLast && <View style={styles.contentBorder} />}
      </Pressable>
    );
  },
);
