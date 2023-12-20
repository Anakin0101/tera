import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { useLazyGetUserProfileInfoQuery } from 'services/apis';
import { useStyleTheme } from './ProfileScreen.styles';
import { Logout, UserInfoBlock } from 'components/index';
import { ProfileCards, ProfileList } from 'components/Profile';

export const ProfileScreen = () => {
  const styles = useStyleTheme();

  const { setOptions } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const [GetUserProfileInfo] = useLazyGetUserProfileInfoQuery();

  useEffect(() => {
    GetUserProfileInfo();
    setOptions({
      title: 'navigation.more',
    });
  }, [GetUserProfileInfo, setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
        <UserInfoBlock />
        <ProfileCards />
        <ProfileList />
        <Logout />
      </ScrollView>
    </SafeAreaView>
  );
};
