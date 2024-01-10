import React from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { Divider, Text } from '../index';
import Template from './Template';
import { Plus } from 'assets/SVGs';
import { ITemplate } from './TransferTemplates.types';
import { useStyles } from './TransferTemplates.styles';

export const TransferTemplates = ({
  templates,
  fromOtherBanks = false,
  selectedData,
  setSelectedData,
  fromPin,
}: any) => {
  const styles = useStyles();

  const renderItem: ListRenderItem<ITemplate> = ({ item, index }) => {
    return (
      <>
        {fromPin ? (
          <Template
            item={item}
            fromPin={fromPin}
            index={index}
            fromOtherBanks={fromOtherBanks}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        ) : (
          <Template
            item={item}
            index={index}
            fromOtherBanks={fromOtherBanks}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        )}
      </>
    );
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
      {!fromOtherBanks && (
        <View style={styles.headerWrapper}>
          <Text children="transfers.templates" />
          <Pressable>
            <View style={styles.addTemplateButton}>
              <Plus />
              <Text special children="transfers.add" size={14} />
            </View>
          </Pressable>
        </View>
      )}
      <FlatList
        data={templates}
        renderItem={renderItem}
        style={styles.list}
        ListFooterComponent={!fromOtherBanks ? footer : null}
        showsHorizontalScrollIndicator={false}
      />
      <Divider marginTop={35} />
    </>
  );
};
