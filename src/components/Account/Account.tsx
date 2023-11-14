import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { AccountProps } from './Account.types';
import { useStyleTheme } from './Account.styles';
import { UserIcon } from 'assets/SVGs';
import { useTranslation } from 'react-i18next';

export const Account: FC<AccountProps> = ({ user, style }) => {
  const { t } = useTranslation();
  const styles = useStyleTheme();
  return (
    <View style={[styles.container, style]}>
      <UserIcon width={96} height={96} />
      <Text style={styles.label}>{t('navigation.hello')}</Text>
      <Text style={styles.user}>{user}</Text>
    </View>
  );
};
