import React, { FC, useCallback, useState, memo, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Button } from 'components';
import { SelectCurrencyModalProps } from './SelectCurrencyModal.types';
import { useStyles } from './SelectCurrencyModal.styles';
import { closeModal } from 'utils/modal';
import { SelectCurrencyModalFieldItem } from './SelectCurrencyModalFieldItem';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const SelectCurrencyModal: FC<SelectCurrencyModalProps> = memo(
  ({ selectedCurrency = CurrencyEnum.GEL, setSelectedCurrency = () => {} }) => {
    const styles = useStyles();
    const [selected, setSelected] = useState<CurrencyEnum | undefined>(selectedCurrency);

    const filteredItems = useMemo(() => {
      return Object.values(CurrencyEnum) || [];
    }, []);

    const renderItem = useCallback(
      ({ item, index }: { item: CurrencyEnum; index: number }) => (
        <SelectCurrencyModalFieldItem
          item={item}
          setSelectedCurrency={(val: CurrencyEnum) => {
            setSelected(val);
          }}
          isSelected={selected === item}
          isLast={filteredItems !== undefined && filteredItems?.length - 1 === index}
        />
      ),
      [filteredItems, selected],
    );

    const handlePress = useCallback(() => {
      if (selected) {
        setSelectedCurrency(selected);
      }
      closeModal();
    }, [selected, setSelectedCurrency]);

    return (
      <View style={styles.container}>
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => item + index.toString()}
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
