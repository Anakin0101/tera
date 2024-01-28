import React, { FC, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider } from 'components/Divider/Divider';
import { Text } from 'components';
import { ItemProps } from './IncomeTypeModal.types';
import { useStyles } from './IncomeTypeModal.styles';
import { CheckCircle } from 'assets/SVGs';

export const Item: FC<ItemProps> = ({ item, selectedIncomeTypes, setSelectedIncomeTypes }) => {
  const styles = useStyles();

  const isSelected = useMemo(() => {
    if (selectedIncomeTypes) {
      return selectedIncomeTypes.some(selectedType => selectedType.type === item.type);
    }
  }, [item.type, selectedIncomeTypes]);

  const handlePress = () => {
    setSelectedIncomeTypes(prev => {
      if (prev.some(i => i.type === item.type)) {
        return prev.filter(type => type.type !== item.type);
      }
      return [...prev, item];
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Divider height={1} />
      <View style={styles.item}>
        <Text secondary={!isSelected} children={item?.name} style={styles.title} />
        {isSelected && <CheckCircle height={24} width={24} />}
      </View>
    </Pressable>
  );
};
