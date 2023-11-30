import React, { useRef, useEffect } from 'react';
import { FlatList, ListRenderItem, Text } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { DashboardTabBar, HomeHeader } from 'components';
import TeraBank from './TeraBank';
import OtherBanks from './OtherBanks';
import { config } from 'utils/config';
import { Pressable } from 'react-native';
import useTheme from 'hooks/useTheme';
import { storage } from 'storage/index';
import { EasyLoginModal } from 'components/modals';
import { useEasyLoginModal } from 'components/modals/EasyLoginModal/hooks/useEasyLoginModal';
import { openModal } from 'utils/modal';
import { resetKeychainValues } from 'utils/logKeychainValues';

export const DashboardScreen = () => {
  const handleClearAllFromStorage = () => {
    resetKeychainValues();
    storage.clearAll();
  };

  const { Fonts } = useTheme();
  const { showEasyLoginPrompt, handleNavigateToAuthorizationMethodsScreeen } = useEasyLoginModal();

  useEffect(() => {
    showEasyLoginPrompt &&
      openModal({
        element: (
          <EasyLoginModal
            openAuthorizationMethodsScreen={handleNavigateToAuthorizationMethodsScreeen}
          />
        ),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEasyLoginPrompt]);

  const flatlistRef = useRef<FlatList>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(1);

  const renderItem: ListRenderItem<string> = ({ item }) => {
    switch (item) {
      case 'terabank':
        return <TeraBank translateY={translateY} zIndex={zIndex} />;
      case 'otherbanks':
        return <OtherBanks />;
      default:
        return null;
    }
  };

  const onTabPress = (index: number) => {
    translateX.value = withTiming(index * config.mobileWidth);
    flatlistRef.current?.scrollToOffset({
      animated: true,
      offset: index * config.mobileWidth,
    });
  };

  return (
    <>
      <HomeHeader translateY={translateY} zIndex={zIndex} />
      <DashboardTabBar
        onTabPress={onTabPress}
        translateX={translateX}
        translateY={translateY}
        zIndex={zIndex}
      />
      <FlatList
        horizontal
        pagingEnabled
        ref={flatlistRef}
        scrollEnabled={false}
        scrollEventThrottle={16}
        renderItem={renderItem}
        data={['terabank', 'otherbanks']}
        showsHorizontalScrollIndicator={false}
      />
      <Pressable onPress={handleClearAllFromStorage}>
        <Text style={[Fonts.semiLarge]} children="Clear all from storage" />
      </Pressable>
      {/* <Pressable onPress={handleClearLoginName}>
        <Text style={[Fonts.semiLarge]} children="clear user's loginName" />
      </Pressable>
      <Pressable onPress={handleClearCredentials}>
        <Text style={[Fonts.semiLarge]} children="clear credentials" />
      </Pressable> */}
    </>
  );
};
