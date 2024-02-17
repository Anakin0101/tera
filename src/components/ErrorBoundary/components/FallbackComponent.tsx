import { Text } from 'components/Text/Text';
import React from 'react';
import { View } from 'react-native';

export const FallbackComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text children={'error fallback component'} />
    </View>
  );
};
