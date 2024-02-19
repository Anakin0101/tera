import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { useStyleTheme } from './ProfileScreen.styles';
import { CustomHeader, LoadingView, Logout, Text, UserInfoBlock } from 'components/index';
import { ProfileCards, ProfileList } from 'components/Profile';
import { useTranslation } from 'react-i18next';
import { useProfileScreen } from './container';
import { getBuildNumber, getVersion } from 'react-native-device-info';

export const ProfileScreen = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();

  const { setOptions } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { GetUserProfileInfo, profileScreenLoading } = useProfileScreen();

  useEffect(() => {
    GetUserProfileInfo();
    setOptions({
      title: 'navigation.more',
    });
  }, [GetUserProfileInfo, setOptions]);

  if (profileScreenLoading) {
    return <LoadingView />;
  }
  return (
    <View style={styles.wrapper}>
      <CustomHeader title={t('common:navigation.more')} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
          <UserInfoBlock />
          <ProfileCards />
          <ProfileList />
          <Logout />
          <View style={styles.buildVersionWrapper}>
            <Text
              style={styles.buildVersionLabel}
            >{`Build version: ${getVersion()} (${getBuildNumber()})`}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
