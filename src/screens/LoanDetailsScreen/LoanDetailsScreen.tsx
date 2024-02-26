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
import { Details } from './Details';
import { SPACED_YEAR } from 'constants/DateTemplates';

const sections = [
  { title: 'slider', data: [{}] },
  { title: 'next', data: [{}] },
  { title: 'details', data: [{}] },
];

export const LoanDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'LoanDetailsScreen'>>();
  const { activeIndex, setActiveIndex, actions, loan, data, isCreditCardOrOverdraft } =
    useLoanDetails(params.index);

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'slider':
        return (
          <Slider
            data={data}
            renderItem={LoanSliderItem}
            actions={actions}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
            actionButtonsContainer={
              actions.length === 4 ? styles.actionButtons : styles.actionButtonsContainer
            }
          />
        );
      case 'next':
        return (
          <NextPayment
            currency={loan.currency}
            nextPaymentAmount={loan.nextPaymentAmount}
            nextPaymentDate={formatDate(loan.nextPaymentDate, SPACED_YEAR)}
            isCreditCardOrOverdraft={isCreditCardOrOverdraft}
          />
        );
      case 'details':
        return <Details data={loan} isCreditCardOrOverdraft={isCreditCardOrOverdraft} />;
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
