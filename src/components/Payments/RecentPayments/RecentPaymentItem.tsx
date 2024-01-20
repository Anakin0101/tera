import React, { memo } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { useStyles } from './RecentPayments.styles';
import { Text } from 'components/Text/Text';
import { RecentPaymentItemProps } from './RecentPayments.types';
import { InternetTVMobile } from 'assets/SVGs';

export const RecentPaymentItem: React.FC<RecentPaymentItemProps> = memo(
  ({ item, isLast = false }) => {
    const styles = useStyles();

    return (
      <Pressable style={[!isLast && styles.itemWrapperMargin]} onPress={() => Alert.alert(item.id)}>
        <View style={styles.itemWrapper}>
          <View style={[styles.itemWrapper, styles.contentWrapper]}>
            <View style={styles.itemIconWrapper}>
              <InternetTVMobile />
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
          </View>
          <View style={styles.valueDateWrapper}>
            <Text style={styles.itemTitle}>{item.value}</Text>
            <Text style={styles.dateLabel}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.contentBorder} />
      </Pressable>
    );
  },
);
