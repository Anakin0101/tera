import React from 'react';
import { Pressable } from 'react-native';
import { useStyleTheme } from './Logout.styles';
import { useTranslation } from 'react-i18next';
import { IconComponent, Text } from 'components';
import { LogoutIcon } from 'assets/SVGs';
import useTheme from 'hooks/useTheme';
import { useLogout } from 'hooks/useLogout';

export const Logout = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const { handleLogout } = useLogout();
  return (
    <Pressable style={styles.logoutContainer} onPress={handleLogout}>
      <IconComponent
        IconJSX={LogoutIcon}
        customIconComponentStyles={{
          width: 48,
          height: 48,
          backgroundColor: Colors.error100,
        }}
        hasBorder={false}
        customIconSize={22}
      />
      <Text children={t('profile.logout')} style={styles.textStyles} />
    </Pressable>
  );
};
