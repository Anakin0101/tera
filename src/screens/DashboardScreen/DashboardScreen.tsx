import React, { FC, useEffect, useRef } from 'react';
import { Alert, FlatList, ListRenderItem, Text } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { DashboardTabBar, HomeHeader } from 'components';
import TeraBank from './TeraBank';
import OtherBanks from './OtherBanks';
import { config } from 'utils/config';
import { Pressable } from 'react-native';
import useTheme from 'hooks/useTheme';
import { storage, storageKeys } from 'storage/index';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { useEasyLoginModal } from 'components/modals/EasyLoginModal/hooks/useEasyLoginModal';
import { EasyLoginModal } from 'components/modals';
import { closeModal, openModal } from 'utils/modal';
import { debounce } from 'utils/debounce';
import { DashboardScreenProps } from './DashboardScreen.types';

export const DashboardScreen: FC<DashboardScreenProps> = ({ navigation }) => {
  const handleClearAllFromStorage = async () => {
    const res = await resetKeychainValues();
    storage.clearAll();
    if (res) {
      Alert.alert(JSON.stringify(storageKeys()));
    }
  };

  const { Fonts } = useTheme();
  const { showEasyLoginPrompt, handleNavigateToAuthorizationMethodsScreeen } = useEasyLoginModal();

  //  TODO -  temporary solution
  const debouncedOpenModal = debounce(() => {
    openModal({
      element: <EasyLoginModal handlePress={handleNavigateToAuthorizationMethodsScreeen} />,
    });
  }, 1000);

  useEffect(() => {
    const handleBlur = () => {
      if (showEasyLoginPrompt) {
        closeModal();
        debouncedOpenModal.cancel();
      }
    };

    const handleFocus = () => {
      if (showEasyLoginPrompt) {
        debouncedOpenModal();
      }
    };

    navigation.addListener('blur', handleBlur);
    navigation.addListener('focus', handleFocus);

    return () => {
      navigation.removeListener('blur', handleBlur);
      navigation.removeListener('focus', handleFocus);
    };
  }, [debouncedOpenModal, navigation, showEasyLoginPrompt]);

  const flatlistRef = useRef<FlatList>(null);
  const translateX = useSharedValue(0);
  const scroll = useSharedValue(0);

  const renderItem: ListRenderItem<string> = ({ item }) => {
    switch (item) {
      case 'terabank':
        return <TeraBank scroll={scroll} />;
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
      <HomeHeader translateY={scroll} />
      <DashboardTabBar onTabPress={onTabPress} translateX={translateX} translateY={scroll} />
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
    </>
  );
};
