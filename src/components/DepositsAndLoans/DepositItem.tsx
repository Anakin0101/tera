import React, { FC, memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, IconComponent, Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { Colors } from 'theme/Variables';
import { useCulture } from 'hooks/useCulture';
import { LanguageKeyForAPIEnum } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { DepositItemProps } from './DepositsAndLoans.types';
import { useStyles } from './DepositsAndLoans.styles';
import Images from 'theme/Images';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { DEPOSIT_DETAILS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';

export const DepositItem: FC<DepositItemProps> = memo(({ item, isLast, index }) => {
  const styles = useStyles();
  const { culture } = useCulture();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const navigateToDepositDetails = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: DEPOSIT_DETAILS_SCREEN,
      params: { index, id: item?.depositId },
    });
  }, [index, navigate, item?.depositId]);

  const title = useMemo(() => {
    if (item?.depositName) {
      return culture === LanguageKeyForAPIEnum.KA ? item?.depositName : item?.depositNameEng;
    }
    return culture === LanguageKeyForAPIEnum.KA ? item?.depositType : item?.depositTypeEng;
  }, [culture, item]);

  return (
    <Pressable onPress={navigateToDepositDetails} style={styles.account}>
      <IconComponent
        customIconComponentStyles={styles.cardContainer}
        pngLocalIcon={Images().AssetsIcon}
      />
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <View style={styles.textContainer}>
            <Text
              regular
              size={14}
              numberOfLines={1}
              color={Colors.textBlack500}
              children={title}
            />
            <Text size={16}>{formatMoney(item?.amount, item?.currency)}</Text>
          </View>
          <View style={styles.interest}>
            <Text children="products.interest" label color={Colors.textBlack500} />
            <Text label color={Colors.success}>
              +{formatMoney(item?.totalInterest, item?.currency)}
            </Text>
          </View>
        </View>
        {!isLast && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
      </View>
    </Pressable>
  );
});
