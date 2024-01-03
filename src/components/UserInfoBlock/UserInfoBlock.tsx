import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './UserInfoBlock.styles';
import { IconComponent, Text } from 'components';
import { UserIcon } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

export const UserInfoBlock = () => {
  const styles = useStyleTheme();
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const { firstName = '', lastName = '', imageId } = userProfileInfo || {};
  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

  return (
    <View style={styles.userInfoBlockContainer}>
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
    </View>
  );
};
