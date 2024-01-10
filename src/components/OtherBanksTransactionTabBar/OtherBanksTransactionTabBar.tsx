import { LayoutChangeEvent } from 'react-native';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { ITabBarProps, SelectedItem } from './OtherBanksTransactionTabBar.types';
import { TabBarLabel } from '../index';
import { useStyles } from './OtherBanksTransactionTabBar.styles';
import { Colors } from 'theme/Variables';
import { useAppSelector } from 'store/hooks/useAppSelector';
export const DISTANCE_BETWEEN_TABS = 35;

export const OtherBanksTransactionTabBar: FC<ITabBarProps> = ({
  zIndex,
  translateX,
  translateY,
  onTabPress,
  otherBanksStyle,
  activeTab,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [, setFirstTabWidth] = useState(0);
  const [, setSecondTabWidth] = useState(0);
  const [, setThirdTabWidth] = useState(0);
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );
  const { accountFromData } = selectedItemFromStore;

  const currencies = ['USD', 'EUR'];

  const onLayout = (event: LayoutChangeEvent, idx: number) => {
    const { width } = event.nativeEvent.layout;
    idx === 0
      ? setFirstTabWidth(width)
      : idx === 1
      ? setSecondTabWidth(width)
      : idx === 2
      ? setThirdTabWidth(width)
      : null;
  };

  const zIdx = useAnimatedStyle(() => {
    return {
      zIndex: zIndex.value,
    };
  });

  const color = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateY.value,
        [0, 20],
        [Colors.dashboardBackground, Colors.overlay],
      ),
    };
  });

  return (
    <>
      <Animated.View
        style={otherBanksStyle ? styles.otherBanksContainer : [styles.tabBarContainer, zIdx]}
      >
        <TabBarLabel
          tabBarLabelStyle
          activeTab={activeTab}
          index={0}
          tab={t('transactionDetails.personal')}
          onLayout={onLayout}
          onTabPress={onTabPress}
          translateX={translateX}
        />
        <TabBarLabel
          tabBarLabelStyle
          activeTab={activeTab}
          index={1}
          tab={t('transactionDetails.iban')}
          onLayout={onLayout}
          onTabPress={onTabPress}
          translateX={translateX}
        />
        {accountFromData?.ccy && !currencies.includes(accountFromData.ccy) ? (
          <TabBarLabel
            tabBarLabelStyle
            activeTab={activeTab}
            index={2}
            tab={'transactionDetails.mobile'}
            onLayout={onLayout}
            onTabPress={onTabPress}
            translateX={translateX}
          />
        ) : (
          <TabBarLabel
            tabBarLabelStyle
            activeTab={activeTab}
            index={2}
            tab={'transactionDetails.mobile'}
            onLayout={onLayout}
            onTabPress={() => {}}
            translateX={translateX}
          />
        )}
      </Animated.View>
      <Animated.View style={[styles.overlay, color]} />
    </>
  );
};
