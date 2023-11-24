import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Slider } from 'components';
import { useLoanDetails } from './container';
import { LoanSliderItem } from './LoanSliderItem';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './LoanDetailsScreen.styles';
import { NextPayment } from './NextPayment';
import { formatDate } from 'utils/formatDate';
import { LoanDetails } from './LoanDetails';

const sections = [
  { title: 'slider', data: [{}] },
  { title: 'next', data: [{}] },
  { title: 'details', data: [{}] },
];

export const LoanDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'LoanDetailsScreen'>>();
  const { loans, activeIndex, setActiveIndex, actions, loan } = useLoanDetails(params.index);

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'slider':
        return (
          <Slider
            data={loans}
            renderItem={LoanSliderItem}
            actions={actions}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
            actionButtonsContainer={styles.actionButtonsContainer}
          />
        );
      case 'next':
        return (
          <NextPayment
            currency={loan.currency}
            nextPaymentAmount={loan.nextPaymentAmount}
            nextPaymentDate={formatDate(loan.nextPaymentDate, ' YYYY')}
          />
        );
      case 'details':
        return <LoanDetails loan={loan} />;
      default:
        return null;
    }
  };

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
