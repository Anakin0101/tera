import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useStyleTheme } from './SettingsScreen.styles';
import { SettingsScreenConfig } from './SettingsScreen.config';
import { SettingsConfigType, SubContentProps } from './SettingsScreen.types';
import { SettingComponent } from 'components/SettingComponent/SettingComponent';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {SettingsScreenConfig.map(({ title, subContent }: SettingsConfigType) => (
          <View key={title}>
            <Text style={styles.titleStyle}>{t(title)}</Text>
            {subContent.map((content: SubContentProps) => (
              <SettingComponent key={content.title} {...content} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
