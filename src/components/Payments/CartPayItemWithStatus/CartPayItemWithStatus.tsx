import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import { useStyles } from './CartPayItemWithStatus.styles';
import { Text } from 'components/Text/Text';
import { CartPayItemWithStatusProps } from './CartPayItemWithStatus.types';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { ClearWhite, SuccessTransaction } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

export const CartPayItemWithStatus: React.FC<CartPayItemWithStatusProps> = memo(
  ({ item, paymentResults }) => {
    const styles = useStyles();

    const renderStatus = useCallback(() => {
      const paymentResult = paymentResults.find(el => el.serviceName === item.name);
      if (paymentResult) {
        return (
          <View
            style={[
              styles.statusWrapper,
              { backgroundColor: paymentResult?.success ? Colors.lightGreen : Colors.lightRed },
            ]}
          >
            {paymentResult?.success ? (
              <SuccessTransaction width={16} height={16} />
            ) : (
              <View style={styles.closeWrapper}>
                <ClearWhite width={8} height={8} />
              </View>
            )}
            <Text
              style={[
                styles.statusLabel,
                { color: paymentResult?.success ? Colors.success : Colors.error },
              ]}
              children={paymentResult?.success ? 'common.payed' : 'common.rejected'}
            />
          </View>
        );
      }
      return null;
    }, [item.name, paymentResults, styles.closeWrapper, styles.statusLabel, styles.statusWrapper]);

    return (
      <View>
        <View style={[styles.itemWrapperContainer]}>
          <View style={styles.itemContainer}>
            <View style={styles.itemWrapper}>
              <View style={styles.itemIconWrapper}>
                <IconComponent imageId={item.imageURL} />
              </View>
              <View style={styles.contentWrapper}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemDesc} numberOfLines={1}>
                  {item.desc}
                </Text>
              </View>
            </View>
          </View>
          {renderStatus()}
        </View>
        <View style={styles.contentBorder} />
      </View>
    );
  },
);
