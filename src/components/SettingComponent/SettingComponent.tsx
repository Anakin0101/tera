import { useStyles } from './SettingComponent.styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { SubContentProps } from 'screens/SettingsScreen/SettingsScreen.types';
import { ProfileStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';

export const SettingComponent = (props: SubContentProps) => {
  const { icon, title, navigateTo } = props;
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useNavigation<ProfileStackScreenProps<'SettingsScreen'>>();

  const handleNavigation = () => {
    navigate(navigateTo);
  };

  return (
    <Pressable style={styles.settingComponentContainer} onPress={handleNavigation}>
      <IconComponent IconJSX={icon} />
      <Text style={styles.settingTextStyle}>{t(title)}</Text>
    </Pressable>
  );
};
