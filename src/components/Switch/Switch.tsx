import useTheme from 'hooks/useTheme';
import React, { forwardRef } from 'react';
import { Switch, SwitchProps, View } from 'react-native';

export const SwitchComponent = forwardRef<Switch, SwitchProps>((props, ref) => {
  const { Colors } = useTheme();
  const scale = 0.6;

  return (
    <View style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}>
      <Switch
        {...props}
        ref={ref}
        trackColor={{ false: Colors.gray200, true: Colors.primary }}
        ios_backgroundColor={Colors.gray200}
        thumbColor={Colors.white}
      />
    </View>
  );
});
