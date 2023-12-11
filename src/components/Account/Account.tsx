import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { AccountProps } from './Account.types';
import { useStyleTheme } from './Account.styles';
import { UserIcon } from 'assets/SVGs';
import { useTranslation } from 'react-i18next';
import { verticalScale } from 'utils/config';

export const Account: FC<AccountProps> = ({ user, style }) => {
  const { t } = useTranslation();
  const styles = useStyleTheme();
  return (
    <View style={[styles.container, style]}>
      <UserIcon width={verticalScale(64)} height={verticalScale(64)} />
      <Text style={styles.label}>{t('navigation.greetings')}</Text>
      <Text style={styles.user}>{user}</Text>
    </View>
  );
};
