import React, { FC } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Text } from 'components';
import { ListProps } from './PayListEndCard.types';
import { useStyles } from './PayListEndCard.styles';
import { useTranslation } from 'react-i18next';
import Images from 'theme/Images';

export const PayListEndCard: FC<ListProps> = ({ onPress }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <Pressable onPress={onPress} style={styles.listFooter}>
      <View style={styles.iconWrapper}>
        <Image style={styles.icon} source={Images()?.ThreeDotsIcon} />
      </View>
      <View>
        <Text style={styles.allPayText}>{t('dashboard.allPay')}</Text>
      </View>
    </Pressable>
  );
};
