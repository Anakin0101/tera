import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackScreenProps } from 'navigation/types';
import { SETTINGS_SCREEN } from 'navigation/ScreenNames';
import { useLazyGetUserProfileInfoQuery } from 'services/apis';
import { useStyleTheme } from './ProfileScreen.styles';
import { Logout, UserInfoBlock } from 'components/index';

export const ProfileScreen = () => {
  const styles = useStyleTheme();

  const { navigate, setOptions } = useNavigation<ProfileStackScreenProps<'ProfileScreen'>>();
  const [GetUserProfileInfo] = useLazyGetUserProfileInfoQuery();

  useEffect(() => {
    GetUserProfileInfo();
    setOptions({
      title: 'navigation.more',
    });
  }, [GetUserProfileInfo, setOptions]);

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <UserInfoBlock />
        <Logout />

        <TouchableOpacity onPress={() => navigate(SETTINGS_SCREEN)}>
          <Text>Navigate to settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
