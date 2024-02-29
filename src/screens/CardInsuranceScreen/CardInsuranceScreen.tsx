import React from 'react';
import { SectionList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { General } from './General';
import { Packages } from './Packages';
import { ProductsStackRouteProps } from 'navigation/types';
import { useStyles } from './CardInsuranceScreen.styles';
import { SectionListRenderItemT } from 'screens/types';

const sections = [
  { title: 'general', data: [{}] },
  { title: 'package', data: [{}] },
];

export const CardInsuranceScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<ProductsStackRouteProps<'CardInsuranceScreen'>>();

  const renderItem: SectionListRenderItemT = ({ section }) => {
    switch (section.title) {
      case 'general':
        return <General />;
      case 'package':
        return <Packages cardId={params.cardId} />;
      default:
        return null;
    }
  };

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={styles.sectionList}
      contentContainerStyle={styles.sectionListContent}
    />
  );
};
