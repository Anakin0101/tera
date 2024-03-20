import React, { FC, memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Badge, Divider, IconComponent, Text } from 'components';
import { useTheme } from 'hooks';
import { VISA } from 'constants/common';
import { ModalStackScreenProps } from 'navigation/types';
import { CARD_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { CheckShieldSmall, ChevronRight, Visa, MasterCard, Lock, Alert } from 'assets/SVGs';
import { CardStatusCode } from 'services/apis/productsAPI/productsAPI.types';
import { CardItemProps } from './AccountDetailsScreen.types';
import { useStyles } from './AccountDetailsScreen.styles';
import { isExpired } from 'utils/formatDate';
import { maskCardPanShort } from 'utils/maskCardPan';

export const CardItem: FC<CardItemProps> = memo(({ item, index, iban, isLast }) => {
  const styles = useStyles();
  const { Colors, Layout } = useTheme();
  const { navigate } = useNavigation<ModalStackScreenProps<'CardDetailsScreen'>>();

  const handlePress = useCallback(() => {
    navigate(CARD_DETAILS_SCREEN, { iban, index });
  }, [iban, index, navigate]);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.cardItemContainer}>
        <View style={styles.cardContainer}>
          <IconComponent imageId={item?.cardLargeImageId} customImageIDStyle={styles.smallCard} />
        </View>
        <View style={Layout.fill}>
          <View style={styles.cardDetailsContainer}>
            <View>
              <View style={styles.nameContainer}>
                <Text children={item?.cardProductName} color={Colors.textBlack500} />
                {item?.isInsured && <CheckShieldSmall />}
              </View>
              <Text children={maskCardPanShort(item?.pan)} />
            </View>
            <View style={styles.cardIconContainer}>
              {item?.cardProductName?.toLowerCase()?.includes(VISA) ? <Visa /> : <MasterCard />}
              <ChevronRight />
            </View>
          </View>
          <View style={styles.badgeContainer}>
            {(item?.status === CardStatusCode.Blocked ||
              item?.status === CardStatusCode.TemporarilyInactive) && (
              <Badge icon={<Lock />} label="products.blocked" />
            )}
            {isExpired(item?.endDate) ? <Badge icon={<Alert />} label="products.expired" /> : null}
          </View>
          {!isLast && <Divider height={1} marginTop={16} marginBottom={16} width="100%" />}
        </View>
      </View>
    </Pressable>
  );
});
