import React from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { Divider, Text } from '../index';
import Template from './Template';
import { Plus } from 'assets/SVGs';
import { ITemplate } from './TransferTemplates.types';
import { useStyles } from './TransferTemplates.styles';

const data = [
  {
    name: 'გივი დაუთაშვილი',
    iban: 'GE07BS*****3232 GEL',
  },
  {
    name: 'თემო გაბეჩავა',
    iban: 'GE07BS*****3232 GEL',
  },
  {
    name: 'ზურა ჭავჭანიძე',
    iban: '01019052736',
  },
  {
    name: 'გივი დაუთაშვილი',
    iban: '01019052736',
  },
];

export const TransferTemplates = () => {
  const styles = useStyles();

  const renderItem: ListRenderItem<ITemplate> = ({ item, index }) => {
    return <Template item={item} index={index} />;
  };

  const footer = () => {
    return (
      <Pressable style={styles.seeAll}>
        <Text children="transfers.all" special size={14} lineHeight={20} />
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.headerWrapper}>
        <Text children="transfers.templates" />
        <Pressable>
          <View style={styles.addTemplateButton}>
            <Plus />
            <Text special children="transfers.add" size={14} />
          </View>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.list}
        ListFooterComponent={footer}
        showsHorizontalScrollIndicator={false}
      />
      <Divider marginTop={35} />
    </>
  );
};
