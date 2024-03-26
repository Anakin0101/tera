import React, { memo, useEffect, useRef } from 'react';
import { View } from 'react-native';

import { useStyles } from './CurrencyConversion.styles';
import { CurrencyConversionItemProps } from './CurrencyConversion.types';
import { Text } from 'components/Text/Text';
import { formatMoney } from 'utils/formatMoney';
import { IconComponent } from 'components/IconComponent/IconComponent';
import Images from 'theme/Images';
import { Divider } from 'components/Divider/Divider';
import { Radio } from 'components/Radio/Radio';
import { useCurrencyConversion } from './container';
import { LoadingInView } from 'components/LoadingView/LoadingInView';

export const CurrencyConversionItem: React.FC<CurrencyConversionItemProps> = memo(
  ({ currentCurrency, transferResponse, buyDetails, setBuyDetails, isFirst }) => {
    const styles = useStyles();
    const defaulAction = useRef(false);

    const { data, isLoading } = useCurrencyConversion(transferResponse, currentCurrency);

    const getCurrentImage = () => {
      const images: any = Images();
      return images?.[currentCurrency] || null;
    };

    useEffect(() => {
      if (
        isFirst &&
        data?.amountSell &&
        buyDetails?.buyCurrency !== currentCurrency &&
        !defaulAction.current
      ) {
        defaulAction.current = true;
        setBuyDetails({
          buyAmount: data?.amountSell,
          buyCurrency: currentCurrency,
        });
      }
    }, [buyDetails?.buyCurrency, currentCurrency, data?.amountSell, isFirst, setBuyDetails]);

    return (
      <View>
        {isLoading ? (
          <View style={styles.loadingStyle}>
            <LoadingInView />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.content}>
              <Radio
                isSelected={buyDetails?.buyCurrency === currentCurrency}
                onPress={() => {
                  if (buyDetails?.buyCurrency === currentCurrency) return;
                  setBuyDetails({
                    buyAmount: data?.amountSell || 0,
                    buyCurrency: currentCurrency,
                  });
                }}
              />
              <IconComponent
                pngLocalIcon={getCurrentImage()}
                pngLocalIconCustomStyle={styles.iconStyle}
                customIconComponentStyles={styles.iconContainer}
                hasBorder={false}
              />
              <View>
                <Text style={styles.title} children={currentCurrency} />
                <Text
                  style={styles.title}
                  children={data?.specialRate !== 0 ? data?.specialRate : data?.standardRate}
                />
              </View>
            </View>
            <Text style={[styles.desc]}>
              {data && formatMoney(data.amountSell)} {currentCurrency}
            </Text>
          </View>
        )}
        <Divider height={1.5} marginTop={10} />
      </View>
    );
  },
);
