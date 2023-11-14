import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './AccountDetailsScreen.styles';
import { Divider, Text } from 'components';
import { CheckShieldSmall, ChevronRight, Visa, MasterCard, Lock, Alert } from 'assets/SVGs';
import { useTheme } from 'hooks';
import { CardItemProps } from './AccountDetailsScreen.types';
import Badge from './Badge';

export const CardItem: FC<CardItemProps> = ({ item, isLast, onPress }) => {
  const { Colors, Layout } = useTheme();
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={styles.cardItemContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.smallCard} />
        </View>
        <View style={Layout.fill}>
          <View style={styles.cardDetailsContainer}>
            <View>
              <View style={styles.nameContainer}>
                <Text children={item.cardProductName} color={Colors.textBlack500} />
                {item.isInsured && <CheckShieldSmall />}
              </View>
              <Text children={`**** ${item.pan.slice(-4)}`} />
            </View>
            <View style={styles.cardIconContainer}>
              {item.cardProductName.toLowerCase().includes('visa') ? <Visa /> : <MasterCard />}
              <ChevronRight />
            </View>
          </View>
          <View style={styles.badgeContainer}>
            {item.status === 9 && <Badge icon={<Lock />} label="products.blocked" />}
            {item.status === 6 && <Badge icon={<Alert />} label="products.expired" />}
          </View>
          {!isLast && <Divider height={1} marginTop={16} marginBottom={16} width="100%" />}
        </View>
      </View>
    </Pressable>
  );
};
