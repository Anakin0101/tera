import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './PrivateTransactionScreen.styles';
import { CheckCircle } from 'assets/SVGs';
import { TextInput } from 'components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setSelectedTransferItem, setOtherValueForID4 } from 'store/slices/transfers/indext';
import { useNavigation } from '@react-navigation/native';

const arr = [
  { name: 'პირადი გადარიცხვა', id: 1 },
  { name: 'ნაშთის გადატანა', id: 2 },
  { name: 'დავალიანების დაფარვა', id: 3 },
  { name: 'სხვა', id: 4 },
];

export const PrivateTransactionScreen = () => {
  const { goBack } = useNavigation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const selectedItemFromStore = useAppSelector(state => state.transfers.selectedItem);
  const [selectedItem, setSelectedItem] = useState<number | null>(selectedItemFromStore?.id || 1);
  const [textInputValue, setTextInputValue] = useState<string>('');

  const handleItemClick = (itemId: number) => {
    const isSameItem = itemId === selectedItem;
    setSelectedItem(isSameItem ? null : itemId);
    if (isSameItem) {
      dispatch(setSelectedTransferItem(null));
    } else {
      const selectedItemObj = arr.find(item => item.id === itemId);
      dispatch(setSelectedTransferItem(selectedItemObj));
    }

    if (itemId !== 4) {
      goBack();
    }
  };

  const handleSaveOtherValue = () => {
    dispatch(setOtherValueForID4({ otherValue: textInputValue }));
    goBack();
  };

  const renderItemContent = (item: { name: string; id: number }) => {
    if (item.id === 4 && selectedItem === item.id) {
      return (
        <View style={{ marginLeft: 20 }}>
          <TextInput
            label="სხვა"
            marginTop={32}
            autoFocus
            inputStyle={{}}
            onChangeText={text => setTextInputValue(text)}
          />
          <Button.Primary fullWidth text="შენახვა" onPress={handleSaveOtherValue} />
        </View>
      );
    } else {
      return (
        <Text center children={item.name} color={Colors.textBlack500} style={styles.selected} />
      );
    }
  };

  return (
    <View>
      <View style={styles.header}>
        {arr.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleItemClick(item.id)}
            style={[
              styles.itemContainer,
              {
                borderTopWidth: index === 0 ? 1 : 0,
              },
            ]}
          >
            {renderItemContent(item)}
            {selectedItem === item.id && selectedItem !== 4 && (
              <View style={styles.check}>
                <CheckCircle style={{ marginTop: 24 }} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
