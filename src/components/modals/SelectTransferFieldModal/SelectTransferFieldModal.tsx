import React, { FC, useCallback, useState, memo, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Button, SearchComponent, Text } from 'components';
import {
  PaymentAddressFieldItem,
  SelectTransferFieldModalProps,
} from './SelectTransferFieldModal.types';
import { useStyles } from './SelectTransferFieldModal.styles';
import { closeModal } from 'utils/modal';
import { SelectTransferFieldItem } from './SelectTransferFieldItem';
import { useTranslation } from 'react-i18next';

export const SelectTransferFieldModal: FC<SelectTransferFieldModalProps> = memo(
  ({ fieldItems = [], confirm, selectedValue, name = '' }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const [selected, setSelected] = useState<PaymentAddressFieldItem | undefined>(selectedValue);
    const [searchText, setSearchText] = useState<string>('');

    const handlePress = useCallback(() => {
      confirm(selected);
      closeModal();
    }, [confirm, selected]);

    const renderItem = useCallback(
      ({ item, index }: { item: PaymentAddressFieldItem; index: number }) => (
        <SelectTransferFieldItem
          fieldItem={item}
          onPress={setSelected}
          isSelected={selected?.value === item?.value}
          isLast={fieldItems?.length !== undefined && fieldItems?.length - 1 === index}
        />
      ),
      [fieldItems?.length, selected],
    );

    const filteredItems = useMemo(() => {
      return fieldItems.filter(item =>
        item?.value?.toLowerCase()?.includes(searchText?.toLowerCase()),
      );
    }, [fieldItems, searchText]);

    return (
      <View style={styles.container}>
        <Text>
          {t('common.choose')} {name}
        </Text>
        <SearchComponent
          placeholder={t('common.search')}
          value={searchText}
          onChangeText={setSearchText}
          customWrapperStyle={styles.searchWrapper}
        />
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listWrapper}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={15}
          updateCellsBatchingPeriod={15}
        />
        <Button.Primary
          fullWidth
          onPress={handlePress}
          text="common.select"
          customWrapperStyle={styles.button}
        />
      </View>
    );
  },
);
