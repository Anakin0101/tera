import React, { useCallback, useEffect, useRef, memo } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { useStyles } from './TabBarComponent.styles';
import { TabBarComponentProps, routeItem } from './TabBarComponent.types';
import { useTranslation } from 'react-i18next';
import { interpolateCustomColors } from 'utils/interpolateCustomColors';
import { Colors } from 'theme/Variables';

/**
 * TabBarComponent is a component that renders a tab bar with animated tabs.
 *
 * @component
 * @example
 * // Example usage of TabBarComponent
 * <TabBarComponent
 *   style={{ marginTop: 20 }}
 *   routes={[{ key: 'home', title: 'Home' }, { key: 'profile', title: 'Profile' }]}
 *   setTabIndex={(index) => console.log('Tab index selected:', index)}
 *   tabIndex={0}
 *   routerIndex={0}
 * />
 */

export const TabBarComponent: React.FC<TabBarComponentProps> = memo(
  ({ style = {}, routes, setTabIndex = () => {}, tabIndex, routerIndex = 0 }) => {
    const styles = useStyles();
    const { t } = useTranslation();

    const tabRef = useRef<FlatList<routeItem> | null>(null);

    useEffect(() => {
      try {
        // Scroll to the router index if it's not the first tab.
        if (routerIndex !== 0) {
          setTimeout(() => {
            tabRef.current?.scrollToIndex({
              index: routerIndex,
              animated: true,
              viewPosition: 0.5,
            });
          }, 400);
        }
      } catch (ex) {
        console.warn('TabBarComponent useEffect error', ex);
      }
    }, [routerIndex]);

    /**
     * Handles tab item press.
     *
     * @param {number} index - Index of the pressed tab item.
     * @returns {void}
     */
    const onPressTabItem = useCallback(
      (index: number) => {
        try {
          setTabIndex(index);

          tabRef.current?.scrollToIndex({
            index: index,
            animated: true,
            viewPosition: 0.5,
          });
        } catch (ex) {
          console.warn('TabBarComponent onPressTabItem error', ex);
        }
      },
      [setTabIndex],
    );

    /**
     * Renders a tab item.
     *
     * @param {{ item: routeItem, index: number }} param0 - Object containing tab item and index.
     * @returns {React.ReactNode | null} The rendered tab item or null if the item is undefined.
     */
    const renderTabItem = useCallback(
      ({ item, index }: { item: routeItem; index: number }) => {
        if (item) {
          return (
            <Pressable
              key={item.key}
              style={[styles.tabItemCont, tabIndex === index && styles.tabItemContActive]}
              onPress={() => onPressTabItem(index)}
            >
              <Animated.Text
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
                style={[
                  styles.tabItemLabel,
                  {
                    color: interpolateCustomColors(
                      tabIndex === index ? 1 : 0,
                      [0.5, 1],
                      [Colors.tabBarDefaultColor, Colors.primary],
                    ),
                  },
                ]}
              >
                {t(item.title)}
              </Animated.Text>
            </Pressable>
          );
        } else {
          return null;
        }
      },
      [
        onPressTabItem,
        styles.tabItemCont,
        styles.tabItemContActive,
        styles.tabItemLabel,
        t,
        tabIndex,
      ],
    );

    return (
      <View style={[styles.tabBar, style]}>
        <FlatList
          ref={tabRef}
          keyboardShouldPersistTaps="always"
          horizontal={true}
          contentContainerStyle={styles.tabBarContent}
          showsHorizontalScrollIndicator={false}
          data={routes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTabItem}
        />
      </View>
    );
  },
);
