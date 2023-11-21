import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { CardsAndAccountsSlider } from 'components';
import { useDepositDetails } from './container';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './DepositDetailsScreen.styles';
import { DepositDetails } from './DepositDetails';

const sections = [
  { title: 'slider', data: [{}] },
  { title: 'details', data: [{}] },
];

export const DepositDetailsScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'DepositDetailsScreen'>>();
  const { activeIndex, setActiveIndex, deposits, deposit, actions, copyToClipboard } =
    useDepositDetails(params.index);

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'slider':
        return (
          <CardsAndAccountsSlider
            type="Deposit"
            data={deposits}
            actions={actions}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
      case 'details':
        return <DepositDetails deposit={deposit} copyToClipboard={copyToClipboard} />;
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
