import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { DeleteKeyProps } from './DeleteKey.types';
import { useStyleTheme } from './DeleteKey.styles';
import { DeleteKeyIcon } from 'assets/SVGs';

export const DeleteKey: FC<DeleteKeyProps> = ({ onPress }) => {
  const styles = useStyleTheme();
  return (
    <TouchableOpacity
      style={styles.pinItem}
      onPress={() => onPress(11)}
      hitSlop={{
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      }}
    >
      <DeleteKeyIcon />
    </TouchableOpacity>
  );
};
