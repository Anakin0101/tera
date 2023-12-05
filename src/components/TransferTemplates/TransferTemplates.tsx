import React from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { Divider, Text } from '../index';
import Template from './Template';
import { Plus } from 'assets/SVGs';
import { ITemplate } from './TransferTemplates.types';
import { useStyles } from './TransferTemplates.styles';

export const TransferTemplates = ({ templates }: any) => {
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
        data={templates}
        renderItem={renderItem}
        style={styles.list}
        ListFooterComponent={footer}
        showsHorizontalScrollIndicator={false}
      />
      <Divider marginTop={35} />
    </>
  );
};
