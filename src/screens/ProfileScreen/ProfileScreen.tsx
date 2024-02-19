import React, { useEffect } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { useStyleTheme } from './ProfileScreen.styles';
import { CustomHeader, LoadingView, Logout, Text, UserInfoBlock } from 'components/index';
import { ProfileCards, ProfileList } from 'components/Profile';
import { useTranslation } from 'react-i18next';
import { useProfileScreen } from './container';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { useAsyncError } from 'components/ErrorBoundary/hooks/asyncError';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { storage, storageKeys } from 'storage/index';

export const ProfileScreen = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();
  const throwError = useAsyncError();

  const { setOptions } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { GetUserProfileInfo, profileScreenLoading } = useProfileScreen();

  const handleCrashApp = () => {
    throwError('Intentional crash for testing ErrorBoundary');
  };

  const handleClearAllFromStorage = async () => {
    const res = await resetKeychainValues();
    storage.clearAll();
    if (res) {
      Alert.alert(JSON.stringify(storageKeys()));
    }
  };

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
          {/* Temporary - will be removed soon */}
          <View style={styles.buildVersionWrapper}>
            <Pressable onPress={handleCrashApp}>
              <Text children="Crash the app" />
            </Pressable>
            <Pressable onPress={handleClearAllFromStorage}>
              <Text children="Clear all from storage" />
            </Pressable>
          </View>
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
