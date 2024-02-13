import useTheme from 'hooks/useTheme';
import React, { forwardRef } from 'react';
import { Switch, SwitchProps, View } from 'react-native';
import { styles } from './Switch.styles';

export const SwitchComponent = forwardRef<Switch, SwitchProps>((props, ref) => {
  const { Colors } = useTheme();

  return (
    <View style={styles.container}>
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
