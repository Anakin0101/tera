import React from 'react';
import { SectionListRenderItem } from 'react-native';
import { useStyles } from './CardInsuranceScreen.styles';
import { SectionList } from 'react-native';
import { General } from './General';
import { Packages } from './Packages';

const sections = [
  { title: 'general', data: [{}] },
  { title: 'package', data: [{}] },
];

export const CardInsuranceScreen = () => {
  const styles = useStyles();

  const renderItem: SectionListRenderItem<any, any> = ({ section }) => {
    switch (section.title) {
      case 'general':
        return <General />;
      case 'package':
        return <Packages />;
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
