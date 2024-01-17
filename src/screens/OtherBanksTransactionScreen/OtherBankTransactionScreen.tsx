import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { OtherBanksTransactionTabBar } from 'components';
import { config } from 'utils/config';
import IbanTransaction from 'components/IbanTransaction/IbanTransaction';
import PersonalNumberTransaction from 'components/PersonalNumberTransaction/PersonalNumberTransaction';
import MobileTransaction from 'components/MobileTransaction/MobileTransaction';
import { useStyleTheme } from './OtherBankTransactionScreen.styles';
import { transactionTabs } from 'constants/transactionConstants';
import { OtherBanksTransactionsTabsEnum } from 'services/apis/transfersAPI/transfersAPI.types';
export const OtherBankTransactionScreen = () => {
  const styles = useStyleTheme();
  const flatlistRef = useRef<FlatList>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(1);
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const onTabPress = (index: number) => {
    setActiveTab(index);

    translateX.value = withTiming(index * config.mobileWidth);

    flatlistRef.current?.scrollToOffset({
      animated: true,

      offset: index * config.mobileWidth,
    });
  };

  const renderItem: ListRenderItem<string> = ({ index }) => {
    switch (index) {
      case OtherBanksTransactionsTabsEnum.PERSONAL_TRANSACTION:
        return <PersonalNumberTransaction />;
      case OtherBanksTransactionsTabsEnum.IBAN_TRANACTION:
        return <IbanTransaction />;
      case OtherBanksTransactionsTabsEnum.MOBILE_TRANSACTION:
        return <MobileTransaction />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.wrapper}>
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
        data={transactionTabs}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
