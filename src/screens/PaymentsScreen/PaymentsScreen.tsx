import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './PaymentsScreen.style';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { changeTheme } from 'store/slices/theme';
import useTheme from 'hooks/useTheme';

export const PaymentsScreen = () => {
  const dispatch = useAppDispatch();
  const { Fonts, darkMode: isDark } = useTheme();

  const onChangeTheme = () => {
    dispatch(changeTheme({ darkMode: !isDark }));
  };

  return (
    <View style={styles.container}>
      <Text style={[Fonts.textSmall]}>Payments main Screen</Text>
      <Pressable onPress={onChangeTheme}>
        <Text style={[Fonts.textSmall]} children="Change theme" />
      </Pressable>
    </View>
  );
};
