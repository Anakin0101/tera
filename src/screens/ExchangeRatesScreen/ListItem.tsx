import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { Divider, IconComponent, Text } from 'components';
import { formatRate } from 'utils/formatRate';
import Images from 'theme/Images';
import { Colors } from 'theme/Variables';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { ListItemProps } from './ExchangeRatesScreen.types';
import { useStyles } from './ExchangeRatesScreen.styles';
import { OfficialRateSign } from './OfficialRateSign';

export const getExchangeIcon = (currency?: CurrencyEnum) => {
  if (!currency) return;
  const currencyIcons = {
    [CurrencyEnum.USD]: Images().Usd,
    [CurrencyEnum.EUR]: Images().Eur,
    [CurrencyEnum.GBP]: Images().Gbp,
    [CurrencyEnum.RUR]: Images().Rur,
    [CurrencyEnum.CHF]: Images().Chf,
    [CurrencyEnum.GEL]: Images().GEL,
  };
  return currencyIcons[currency];
};

export const ListItem: FC<ListItemProps> = memo(({ item }) => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.item}>
        <IconComponent
          pngLocalIcon={getExchangeIcon(item?.currency)}
          pngLocalIconCustomStyle={styles.icon}
          customIconComponentStyles={styles.iconContainer}
        />
        <View style={styles.officialRates}>
          <Text
            secondary
            size={16}
            lineHeight={16}
            letterSpacing={-0.5}
            children={item?.currency}
          />
          <View style={styles.officialContainer}>
            <Text
              size={16}
              lineHeight={22}
              letterSpacing={-0.5}
              children={formatRate(item?.official?.sell || 0)}
            />
            {item?.official && (
              <View style={styles.official}>
                <OfficialRateSign buy={item?.official?.buy} />
                <Text
                  size={12}
                  lineHeight={18}
                  children={formatRate(Math.abs(item?.official?.buy))}
                  style={styles.top}
                  color={item?.official?.buy > 0 ? Colors.success : Colors.error}
                />
              </View>
            )}
          </View>
        </View>
        <View style={[styles.teraRates, item?.special && styles.marginTop]}>
          <View style={styles.fill}>
            <Text size={12} lineHeight={16} secondary children="exchange.buy" />
            {item?.special && (
              <Text size={16} lineHeight={24} children={formatRate(item?.special?.buy)} />
            )}
            <Text
              size={16}
              children={formatRate(item?.standard?.buy)}
              style={item?.special && styles.lineThrough}
            />
          </View>
          <View style={styles.fill}>
            <Text size={12} lineHeight={16} secondary children="exchange.sell" />
            {item?.special && (
              <Text size={16} lineHeight={24} children={formatRate(item?.special?.sell)} />
            )}
            <Text
              size={16}
              children={formatRate(item?.standard?.sell)}
              style={item?.special && styles.lineThrough}
            />
          </View>
        </View>
      </View>
      <Divider height={1} />
    </View>
  );
});
