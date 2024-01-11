import React from 'react';
import { Pressable } from 'react-native';
import { useStyleTheme } from './Logout.styles';
import { useTranslation } from 'react-i18next';
import { IconComponent, Text } from 'components';
import { LogoutIcon } from 'assets/SVGs';
import { useLogout } from 'hooks';

export const Logout = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();
  const { handleLogout } = useLogout();
  return (
    <Pressable style={styles.logoutContainer} onPress={handleLogout}>
      <IconComponent
        IconJSX={LogoutIcon}
        customIconComponentStyles={styles.iconComponentCustomStyles}
        hasBorder={false}
        customIconSize={22}
        pressable={false}
      />
      <Text children={t('profile.logout')} style={styles.textStyles} />
    </Pressable>
  );
};
