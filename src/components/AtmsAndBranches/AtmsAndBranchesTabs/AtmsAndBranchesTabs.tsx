import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { TabView, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { useStyleTheme } from './AtmsAndBranchesTabs.styles';
import { LoadingInView, Text } from 'components';
import { config } from 'utils/config';
import { useTranslation } from 'react-i18next';
import { BranchesList, AtmsList } from 'components/AtmsAndBranches';

export type TabRouteType = {
  key: string;
  title: string;
};

const LazyPlaceholder = () => <LoadingInView />;

export const AtmsAndBranchesTabs = ({
  coords,
}: {
  coords: { latitude: number; longitude: number };
}) => {
  const styles = useStyleTheme();
  const { t } = useTranslation();

  const [index, setIndex] = useState<number>(0);

  const [routes] = useState<TabRouteType[]>([
    { key: 'branch', title: t('atmsAndBranches.branch') },
    { key: 'atm', title: t('atmsAndBranches.atm') },
  ]);

  const renderScene = ({ route }: SceneRendererProps & { route: Route }) => {
    switch (route.key) {
      case 'branch':
        return <BranchesList currentLocation={coords} />;
      case 'atm':
        return <AtmsList currentLocation={coords} />;
      default:
        return null;
    }
  };

  const renderLazyPlaceholder = () => <LazyPlaceholder />;

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<TabRouteType> },
  ) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const isActive = i === props.navigationState.index;

          return (
            <Pressable
              key={route.key}
              style={[styles.tabItem, isActive ? styles.activeTabItem : styles.inActiveTabItem]}
              onPress={() => setIndex(i)}
            >
              <Text style={isActive ? styles.activeTabText : styles.inActiveTabText}>
                {route.title}
              </Text>
              {isActive && <View style={styles.activeTabIndicator} />}
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      renderLazyPlaceholder={renderLazyPlaceholder}
      onIndexChange={setIndex}
      initialLayout={{ width: config.mobileWidth }}
      style={styles.container}
    />
  );
};
