import React, { FC, RefObject, useEffect, useRef } from 'react';
import { View, SectionList, SectionListRenderItem } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import Animated, {
  runOnJS,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setScrollToTop, setShouldCloseCards } from 'store/slices/dashboard';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useTheme } from 'hooks';
import {
  CardsAndBalance,
  DashboardAssets,
  DashboardOperations,
  DashboardSkeleton,
  DashboardTemplates,
  DashboardUpcomingOps,
} from 'components';
import { ITeraBankProps } from './DashboardScreen.types';
import { useStyleTheme } from './DashboardScreen.style';
import { useDashboardScreen } from './container';
import { Banker } from 'components';
import { Offers, tempData } from './Sections';
import { DashboardPensionFund } from 'components/DashboardPensionFund/DashboardPensionFund';

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

const MainBank: FC<ITeraBankProps> = ({ translateY, zIndex }) => {
  const styles = useStyleTheme();
  const { Colors } = useTheme();
  const dispatch = useAppDispatch();
  const anim = useSharedValue(0);
  const ref: RefObject<SectionList<any, any>> = useRef(null);
  const { scrollToTop } = useAppSelector(state => state.dashboard);

  const {
    templates,
    customOperations,
    creditCards,
    overDraft,
    getLoanCustomerId,
    assets,
    banker,
    customerOperationsLoading,
    customerIdLoading,
    assetsLoading,
    bankerLoading,
    overDraftLoading,
    creditCardsLoading,
  } = useDashboardScreen();
  useScrollToTop(ref);

  const closing = () => {
    dispatch(setShouldCloseCards(true));
  };

  const scrollToTopHandler = () => {
    ref?.current?.scrollToLocation({
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
    () => zIndex.value,
    result => {
      if (result === 0) {
        runOnJS(closing)();
      }
    },
    [],
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
    event.contentOffset.y > 5 ? (zIndex.value = 0) : (zIndex.value = 1);
  });

  const borderColor = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        translateY.value,
        [0, 20],
        [Colors.dashboardBackground, Colors.overlay],
      ),
    };
  });

  const animPaddingTop = useAnimatedStyle(() => {
    const paddingTop = interpolate(anim.value, [0, 1], [230, 425]);
    return {
      paddingTop,
    };
  });

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'templates':
        return (
          <View>
            <DashboardTemplates data={templates} />
          </View>
        );
      case 'payments':
        return <DashboardUpcomingOps data={tempData.payments} />;
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
        return <Offers data={tempData.offers} />;
      case 'pension':
        return <DashboardPensionFund data={tempData.pensions} />;
      case 'banker':
        return <Banker data={banker} />;
      case 'transactions':
        return <DashboardOperations data={customOperations?.ops} />;
      default:
        return null;
    }
  };

  if (
    customerOperationsLoading ||
    customerIdLoading ||
    assetsLoading ||
    bankerLoading ||
    overDraftLoading ||
    creditCardsLoading
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
      <CardsAndBalance anim={anim} translateY={translateY} zIndex={zIndex} />
      <Animated.View style={[styles.sectionList, borderColor]}>
        <AnimatedSectionList
          ref={ref}
          sections={sections}
          renderItem={renderItem}
          bounces={false}
          nestedScrollEnabled
          style={animPaddingTop}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.sectionListContent}
        />
      </Animated.View>
    </View>
  );
};

export default MainBank;
