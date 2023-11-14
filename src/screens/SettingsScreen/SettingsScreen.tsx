import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfileStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { AUTHORIZATION_METHODS_SCREEN } from 'navigation/ScreenNames';
import { useStyleTheme } from './SettingsScreen.styles';
import { SettingsScreenConfig } from './SettingsScreen.config';
import { SettingsConfigType, SubContentProps } from './SettingsScreen.types';
import { SettingComponent } from 'components/SettingComponent/SettingComponent';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();
  const { navigate } = useNavigation<ProfileStackScreenProps<'SettingsScreen'>>();

  return (
    <View style={styles.container}>
      {SettingsScreenConfig.map(({ title, subContent }: SettingsConfigType) => (
        <View key={title}>
          <Text style={styles.titleStyle}>{t(title)}</Text>
          {subContent.map((content: SubContentProps) => (
            <SettingComponent key={content.title} {...content} />
          ))}
        </View>
      ))}
      <TouchableOpacity onPress={() => navigate(AUTHORIZATION_METHODS_SCREEN)}>
        <Text>Navigate to authorization methods screen</Text>
      </TouchableOpacity>
    </View>
  );
};
