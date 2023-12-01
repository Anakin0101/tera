import React from 'react';
import { SectionList, SectionListRenderItem, View } from 'react-native';
import { Slider } from 'components';
import { useDepositDetails } from './container';
import { useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './DepositDetailsScreen.styles';
import { DepositDetails } from './DepositDetails';
import { DepositSliderItem } from './DepositSliderItem';

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
          <Slider
            data={deposits}
            renderItem={DepositSliderItem}
            actions={actions}
            index={activeIndex}
            setActiveIndex={setActiveIndex}
            actionButtonsContainer={
              actions.length === 4 ? styles.actionButtons : styles.actionButtonsContainer
            }
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
