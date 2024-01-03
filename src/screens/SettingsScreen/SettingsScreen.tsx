import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useStyleTheme } from './SettingsScreen.styles';
import { SettingsScreenConfig } from './SettingsScreen.config';
import { SettingsConfigType } from './SettingsScreen.types';
import { useTranslation } from 'react-i18next';
import { ProfileListItem } from 'components/Profile';
import { ProfileItemType } from 'screens/ProfileScreen/ProfileScreen.types';

export const SettingsScreen = () => {
  const styles = useStyleTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {SettingsScreenConfig.map(({ title, subContent }: SettingsConfigType) => (
          <View key={title} style={styles.sectionContainer}>
            <Text style={styles.titleStyle}>{t(title)}</Text>
            {subContent.map((content: ProfileItemType) => {
              const isLast = subContent.length - 1 === content.index;
              return <ProfileListItem key={content.id} isLast={isLast} {...content} />;
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
