import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './UserInfoBlock.styles';
import { IconComponent, Text } from 'components';
import { UserIcon } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import { MODAL_STACK, SETTINGS_SCREEN } from 'navigation/ScreenNames';

export const UserInfoBlock = () => {
  const styles = useStyleTheme();
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const { firstName = '', lastName = '', imageId } = userProfileInfo || {};
  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const navigateToSettings = () => {
    navigate(MODAL_STACK, {
      screen: SETTINGS_SCREEN,
    });
  };

  return (
    <Pressable style={styles.userInfoBlockContainer} onPress={navigateToSettings}>
      <View style={styles.userIconContainer}>
        {imageId ? (
          <IconComponent imageId={imageId} />
        ) : (
          <IconComponent
            IconJSX={UserIcon}
            customIconComponentStyles={styles.userIconStyles}
            customIconSize={30}
            fillColor={Colors.black200}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.fullNameText} children={fullName} />
        <Text style={styles.editParametersText} children={'profile.edit_settings'} />
      </View>
    </Pressable>
  );
};
