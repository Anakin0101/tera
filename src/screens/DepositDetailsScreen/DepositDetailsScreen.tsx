import React, { useCallback } from 'react';
import { SectionList, View } from 'react-native';
import { Slider } from 'components';
import { useDepositDetails } from './container';
import { useStyles } from './DepositDetailsScreen.styles';
import { DepositDetails } from './DepositDetails';
import { DepositSliderItem } from './DepositSliderItem';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'slider', data: [{}] },
  { title: 'details', data: [{}] },
];

export const DepositDetailsScreen = () => {
  const styles = useStyles();
  const {
    activeIndex,
    setActiveIndex,
    deposits,
    deposit,
    actions,
    copyToClipboard,
    depositDetails,
  } = useDepositDetails();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'slider':
          return (
            <Slider
              data={deposits}
              renderItem={DepositSliderItem}
              actions={actions}
              index={activeIndex}
              setActiveIndex={setActiveIndex}
              actionButtonsContainer={
                actions?.length === 4 ? styles.actionButtons : styles.actionButtonsContainer
              }
            />
          );
        case 'details':
          return (
            <DepositDetails
              deposit={deposit}
              copyToClipboard={copyToClipboard}
              percentEnrolmentPeriod={depositDetails?.additional?.percentEnrolmentPeriod}
            />
          );
        default:
          return null;
      }
    },
    [
      actions,
      activeIndex,
      copyToClipboard,
      deposit,
      deposits,
      setActiveIndex,
      styles.actionButtons,
      styles.actionButtonsContainer,
      depositDetails?.additional?.percentEnrolmentPeriod,
    ],
  );

  return (
    <View style={styles.container}>
      <SectionList
        bounces={false}
        sections={sections}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.sectionList}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};
