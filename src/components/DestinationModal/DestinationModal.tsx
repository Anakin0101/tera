import React, { FC, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { useStyles } from './DestinationModal.styles';
import { destinationModalProps } from './DestinationModal.types';
import { CheckCircle } from 'assets/SVGs';
// import { openModal } from 'utils/modal';
// import { RequestStatusModal } from 'components/modals/RequestStatusModal/RequestStatusModal';

const arr = [
  { name: 'პირადი გადარიცხვა', id: 1 },
  { name: 'ნაშთის გადატანა', id: 2 },
  { name: 'დავალიანების დაფარვა', id: 3 },
  { name: 'სხვა', id: 4 },
];

export const DestinationModal: FC<destinationModalProps> = () => {
  const styles = useStyles();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (itemId: number) => {
    if (itemId === 4) {
      // openModal({
      //   element: <RequestStatusModal />,
      // });
    } else {
      setSelectedItem(itemId === selectedItem ? null : itemId);
    }
  };

  return (
    <>
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
              <Text
                center
                children={item.name}
                color={Colors.textBlack500}
                style={styles.selected}
              />
              {selectedItem === item.id && (
                <View style={styles.check}>
                  <CheckCircle />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};
