import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './UserInfoBlock.styles';
import { Text } from 'components';

export const UserInfoBlock = () => {
  const styles = useStyleTheme();
  const { profileInfo } = useAppSelector(state => state.userInfo.userProfileInfo);

  const fullName = useMemo(() => {
    const { firstName = '', lastName = '' } = profileInfo || {};

    return `${firstName} ${lastName}`;
  }, [profileInfo]);
  return (
    <View style={styles.userInfoBlockContainer}>
      <View style={styles.userIconContainer}>
        <View style={styles.temporaryImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.fullNameText} children={fullName} />
        <Text style={styles.editParametersText} children={'profile.edit_settings'} />
      </View>
    </View>
  );
};
