import React, { FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { SelectPaymentFieldItemProps } from './SelectPaymentFieldModal.types';
import { useStyles } from './SelectPaymentFieldModal.styles';
import { CheckCircle } from 'assets/SVGs';

export const SelectPaymentFieldItem: FC<SelectPaymentFieldItemProps> = memo(
  ({ fieldItem, onPress, isSelected, isLast }) => {
    const styles = useStyles();

    return (
      <Pressable onPress={() => onPress(fieldItem.value)} style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <Text style={[styles.itemTitle, isSelected && styles.itemSelected]}>
            {fieldItem.name}
          </Text>
          {isSelected && <CheckCircle />}
        </View>
        {!isLast && <Divider marginTop={24} height={1} />}
      </Pressable>
    );
  },
);
