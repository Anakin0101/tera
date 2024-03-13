import React, { FC, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, IconComponent, Text } from '../index';
import { formatMoney } from 'utils/formatMoney';
import { useCulture, useTheme } from 'hooks';
import { LanguageKeyForAPIEnum } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { ListItemProps } from './DepositsAndLoans.types';
import { useStyles } from './DepositsAndLoans.styles';

export const ListItem: FC<ListItemProps> = ({ item, isLast, onPress, icon }) => {
  const styles = useStyles();
  const { Colors } = useTheme();
  const { culture } = useCulture();

  const isDeposit = 'depositId' in item;

  const isOverdraft = 'overdraftLimit' in item;

  const isCreditCard = 'creditLimit' in item;

  const title = useMemo(() => {
    if (isDeposit) {
      if (item?.depositName) {
        return culture === LanguageKeyForAPIEnum.KA ? item?.depositName : item?.depositNameEng;
      }
      return culture === LanguageKeyForAPIEnum.KA ? item?.depositType : item?.depositTypeEng;
    } else {
      return item?.productName;
    }
  }, [isDeposit, item, culture]);

  return (
    <Pressable onPress={onPress} style={styles.account}>
      <IconComponent customIconComponentStyles={styles.cardContainer} pngLocalIcon={icon} />
      <View style={styles.detailsWrapper}>
        <View style={styles.details}>
          <View style={styles.textContainer}>
            <Text
              regular
              size={14}
              numberOfLines={3}
              color={Colors.textBlack500}
              children={title}
            />
            <Text size={16}>
              {formatMoney(
                isOverdraft
                  ? item?.overdraftLimit
                  : isCreditCard
                  ? item?.creditLimit
                  : item?.amount,
                item?.currency,
              )}
            </Text>
          </View>
          {isDeposit && (
            <View style={styles.interest}>
              <Text children="products.interest" label color={Colors.textBlack500} />
              <Text label color={Colors.success}>
                +{formatMoney(item?.totalInterest, item?.currency)}
              </Text>
            </View>
          )}
          {!isDeposit && item?.nextPaymentAmount ? (
            <View style={styles.fee}>
              <Text children="products.fee" label color={Colors.textBlack500} />
              <Text
                label
                color={Colors.error}
                children={formatMoney(item?.nextPaymentAmount, item?.currency)}
              />
            </View>
          ) : null}
        </View>
        {!isLast && <Divider height={1} marginTop={18} marginBottom={18} width="100%" />}
      </View>
    </Pressable>
  );
};
