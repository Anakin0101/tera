import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import { View, SectionList, SectionListRenderItem, Pressable, RefreshControl } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import Animated, {
  runOnJS,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  Extrapolation,
  withTiming,
} from 'react-native-reanimated';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setScrollToTop } from 'store/slices/dashboard';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useTheme } from 'hooks';
import {
  DashboardAssets,
  DashboardOperations,
  DashboardSkeleton,
  DashboardTemplates,
  // DashboardUpcomingOps,
} from 'components';
import { ITeraBankProps } from './DashboardScreen.types';
import { useStyleTheme } from './DashboardScreen.style';
import { useDashboardScreen } from './container';
import { Banker } from 'components';
import { Offers } from 'components';
import { DashboardPensionFund } from 'components/DashboardPensionFund/DashboardPensionFund';
import { config } from 'utils/config';
import AvailableBalance from 'components/CardsAndBalance/AvailableBalance';
import { OPEN_CARD_WIDTH } from 'constants/index';
import { Card } from 'components/CardsAndBalance/Card';
import { ActionButtons } from 'components/CardsAndBalance/ActionButtons';
import Indicator from 'components/CardsAndBalance/Indicator';

const sections = [
  { title: 'templates', data: [{}] },
  { title: 'payments', data: [{}] },
  { title: 'assets', data: [{}] },
  { title: 'offers', data: [{}] },
  { title: 'pension', data: [{}] },
  { title: 'banker', data: [{}] },
  { title: 'transactions', data: [{}] },
];

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const CARD_WIDTH_WITHOUT_PADDING = OPEN_CARD_WIDTH + 24;
const EMPTY_SPACE = (config.mobileWidth - OPEN_CARD_WIDTH) / 2;

const data = [
  {
    color: '#922a69',
  },
  {
    color: '#1F1E24',
  },
  {
    color: '#922a69',
  },
  {
    color: '#922a69',
  },
  {
    color: '#922a69',
  },
  {
    color: '#922a69',
  },
  {
    color: '#922a69',
  },
];

const MainBank: FC<ITeraBankProps> = ({ scroll }) => {
  const styles = useStyleTheme();
  const { Colors } = useTheme();
  const dispatch = useAppDispatch();
  const sectionListRef: RefObject<SectionList<any, any>> = useRef(null);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const { scrollToTop } = useAppSelector(state => state.dashboard);
  const shouldClose = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardsOffset = useSharedValue(0);
  const [isBannerDataFetched, setIsBannerDataFetched] = useState<boolean>(false);

  const {
    templates,
    customerOperations,
    creditCards,
    overDraft,
    getLoanCustomerId,
    assets,
    banker,
    customerOperationsLoading,
    loanCustomerIdLoading,
    assetsLoading,
    bankerLoading,
    overDraftLoading,
    creditCardsLoading,
    banners,
    bannersLoading,
    totalSavingLoading,
    totalSaving,
    onRefresh,
    refreshing,
    profileLoading,
    temlpatesLoading,
    // deposits,
    depositsLoading,
  } = useDashboardScreen();

  useScrollToTop(sectionListRef);

  const closing = () => {
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
    cardsOffset.value = withTiming(0);
  };

  const scrollToTopHandler = () => {
    sectionListRef?.current?.scrollToLocation({
      itemIndex: 0,
      viewOffset: 200,
      sectionIndex: 0,
    });
  };

  useEffect(() => {
    if (scrollToTop) {
      scrollToTopHandler();
      dispatch(setScrollToTop(false));
    }
  }, [dispatch, scrollToTop]);

  useAnimatedReaction(
    () => shouldClose.value,
    result => {
      if (result) {
        runOnJS(closing)();
      }
    },
    [],
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
    scroll.value = event.contentOffset.y;
    event.contentOffset.y > 0 ? (shouldClose.value = true) : (shouldClose.value = false);
  });

  const borderColor = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        translateY.value,
        [0, 230],
        [Colors.dashboardBackground, Colors.overlay],
      ),
    };
  });

  const animPaddingTop = useAnimatedStyle(() => {
    const paddingTop = interpolate(cardsOffset.value, [0, 1], [230, 425]);
    return {
      paddingTop,
    };
  });

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'templates':
        return <DashboardTemplates data={templates} />;
      // waiting API
      // case 'payments':
      //   return <DashboardUpcomingOps data={tempData.payments} />;
      case 'assets':
        return (
          <DashboardAssets
            creditCards={creditCards}
            overDraft={overDraft}
            getLoanCustomerId={getLoanCustomerId}
            assets={assets}
          />
        );
      case 'offers':
        return <Offers data={banners?.data} />;
      case 'pension':
        return <DashboardPensionFund data={totalSaving?.totalSaving} />;
      case 'banker':
        return <Banker {...banker} />;
      case 'transactions':
        return <DashboardOperations data={customerOperations} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (banners) {
      setIsBannerDataFetched(true);
    }
  }, [banners]);

  const openCards = (index: number) => {
    if (!index) {
      return;
    }
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH_WITHOUT_PADDING - 15) + index,
      y: 0,
      animated: true,
    });
    cardsOffset.value = withTiming(1);
  };

  const closeCards = () => {
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
    cardsOffset.value = withTiming(0);
  };

  const handleScroll = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
    cardsOffset.value = interpolate(event.contentOffset.x, [0, 250], [0, 1], Extrapolation.CLAMP);
  });

  const cardContainerStyle = useAnimatedStyle(() => {
    return {
      zIndex: translateY.value > 0 ? -1 : 999,
      height: interpolate(cardsOffset.value, [0, 1], [170, 260], Extrapolation.CLAMP),
    };
  });

  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 230], [0, 0.8]);
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      opacity,
      display,
    };
  });

  const additionalPadding =
    data.length === 2
      ? EMPTY_SPACE - 5
      : data.length === 3
      ? EMPTY_SPACE - 15
      : data.length === 4
      ? EMPTY_SPACE - 20
      : 0;

  if (
    customerOperationsLoading ||
    loanCustomerIdLoading ||
    assetsLoading ||
    bankerLoading ||
    overDraftLoading ||
    creditCardsLoading ||
    bannersLoading ||
    totalSavingLoading ||
    profileLoading ||
    temlpatesLoading ||
    depositsLoading ||
    (!isBannerDataFetched && banners?.data.length === 0)
  ) {
    return (
      <View style={styles.LoaderContenr}>
        <View style={styles.loader}>
          <DashboardSkeleton />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.cardsContainer, cardContainerStyle]}>
        <Pressable style={[styles.scrollViewWrapper]} onPress={closeCards}>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            bounces={false}
            pagingEnabled
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={OPEN_CARD_WIDTH + 10}
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.content,
              {
                width: data.length * CARD_WIDTH_WITHOUT_PADDING + additionalPadding,
              },
            ]}
          >
            {data.map((card, index) => (
              <Card
                key={index}
                item={card}
                index={index}
                progress={cardsOffset}
                translateX={translateX}
                onCardPress={() => openCards(index)}
              />
            ))}
          </Animated.ScrollView>
        </Pressable>
        <ActionButtons progress={cardsOffset} onSpacePress={closeCards}>
          <Indicator data={data} translateX={translateX} />
        </ActionButtons>
        <AvailableBalance progress={cardsOffset} />
      </Animated.View>
      <Animated.View style={[styles.backdrop, backDropAnimation]} />
      <Animated.View style={[styles.sectionList, borderColor]}>
        <AnimatedSectionList
          ref={sectionListRef}
          sections={sections}
          renderItem={renderItem}
          nestedScrollEnabled
          style={animPaddingTop}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.sectionListContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      </Animated.View>
    </View>
  );
};

export default MainBank;
