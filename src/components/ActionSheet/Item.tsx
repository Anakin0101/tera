import React, { FC, memo } from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from '../index';
import { Colors } from 'theme/Variables';
import { ItemProps } from './ActionSheet.types';
import { useStyles } from './ActionSheet.styles';

export const Item: FC<ItemProps> = memo(({ item, isFirst, isLast }) => {
  const styles = useStyles();

  return (
    <TouchableHighlight
      style={[styles.actionSheetView, isFirst && styles.firstItem, isLast && styles.lastItem]}
      underlayColor={Colors.actionSheetBg}
      onPress={item.onPress}
    >
      <Text center children={item.label} color={item.color || Colors.black700} size={18} />
    </TouchableHighlight>
  );
});
