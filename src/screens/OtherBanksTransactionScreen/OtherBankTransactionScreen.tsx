import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { OtherBanksTransactionTabBar } from 'components';
import { config } from 'utils/config';
// import { Pressable } from 'react-native';
import OtherBanks from 'screens/DashboardScreen/OtherBanks';
import IbanTransaction from 'components/IbanTransaction/IbanTransaction';
import PersonalNumberTransaction from 'components/PersonalNumberTransaction/PersonalNumberTransaction';

export const OtherBankTransactionScreen = () => {
  const flatlistRef = useRef<FlatList>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(1);

  const [activeTab, setActiveTab] = useState<number | null>(0);
  const renderItem: ListRenderItem<string> = ({ item }) => {
    switch (item) {
      case 'პირადობით':
        return <PersonalNumberTransaction />;
      case 'ანგარიშით':
        return <IbanTransaction />;
      case 'მობილურით':
        return <OtherBanks />;
      default:
        return null;
    }
  };

  const onTabPress = (index: number) => {
    if (activeTab === index) {
      setActiveTab(null);
    } else {
      setActiveTab(index);
    }
    translateX.value = withTiming(index * config.mobileWidth);
    flatlistRef.current?.scrollToOffset({
      animated: true,
      offset: index * config.mobileWidth,
    });
  };

  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <OtherBanksTransactionTabBar
        onTabPress={onTabPress}
        translateX={translateX}
        translateY={translateY}
        zIndex={zIndex}
        activeTab={activeTab}
        otherBanksStyle
      />
      <FlatList
        horizontal
        pagingEnabled
        ref={flatlistRef}
        scrollEnabled={false}
        scrollEventThrottle={16}
        renderItem={renderItem}
        data={['პირადობით', 'ანგარიშით', 'მობილურით']}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
