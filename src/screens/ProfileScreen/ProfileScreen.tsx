import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { useLazyGetUserProfileInfoQuery } from 'services/apis';
import { useStyleTheme } from './ProfileScreen.styles';
import { CustomHeader, Logout, UserInfoBlock } from 'components/index';
import { ProfileCards, ProfileList } from 'components/Profile';
import { useTranslation } from 'react-i18next';

export const ProfileScreen = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();

  const { setOptions } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const [GetUserProfileInfo] = useLazyGetUserProfileInfoQuery();

  useEffect(() => {
    GetUserProfileInfo();
    setOptions({
      title: 'navigation.more',
    });
  }, [GetUserProfileInfo, setOptions]);

  return (
    <View style={styles.wrapper}>
      <CustomHeader title={t('common:navigation.more')} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
          <UserInfoBlock />
          <ProfileCards />
          <ProfileList />
          <Logout />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
