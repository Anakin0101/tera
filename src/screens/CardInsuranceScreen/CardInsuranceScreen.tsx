import React, { useCallback } from 'react';
import { SectionList } from 'react-native';
import { General } from './General';
import { Packages } from './Packages';
import { useStyles } from './CardInsuranceScreen.styles';
import { SectionListRenderItemT } from 'screens/types';
import { useCardInsurance } from './container';

const sections = [
  { title: 'general', data: [{}] },
  { title: 'package', data: [{}] },
];

export const CardInsuranceScreen = () => {
  const styles = useStyles();
  const { packages, iban, activeCard } = useCardInsurance();

  const renderItem: SectionListRenderItemT = useCallback(
    ({ section }) => {
      switch (section.title) {
        case 'general':
          return <General />;
        case 'package':
          return <Packages packages={packages} activeCard={activeCard} iban={iban} />;
        default:
          return null;
      }
    },
    [activeCard, iban, packages],
  );

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
