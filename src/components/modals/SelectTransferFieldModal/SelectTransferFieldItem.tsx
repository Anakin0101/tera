import React, { FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { SelectTransferFieldItemProps } from './SelectTransferFieldModal.types';
import { useStyles } from './SelectTransferFieldModal.styles';
import { CheckCircle } from 'assets/SVGs';

export const SelectTransferFieldItem: FC<SelectTransferFieldItemProps> = memo(
  ({ fieldItem, onPress, isSelected, isLast }) => {
    const styles = useStyles();

    return (
      <Pressable onPress={() => onPress(fieldItem)} style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <Text style={[styles.itemTitle, isSelected && styles.itemSelected]}>
            {fieldItem.value}
          </Text>
          {isSelected && <CheckCircle />}
        </View>
        {!isLast && <Divider marginTop={24} height={1} />}
      </Pressable>
    );
  },
);
