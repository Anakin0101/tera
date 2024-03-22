import React from 'react';
import { Pressable, View } from 'react-native';
import { IconComponent, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { useStyles } from './EditUserInfo.styles';
import { Camera, Gallery } from 'assets/SVGs';
import { ModalPropsType } from './EditUserInfo.types';

export const UpdateProfileModal = ({ onPress }: ModalPropsType) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <View>
      <Pressable onPress={() => onPress(false)} style={styles.rulesWrapper}>
        <IconComponent customIconSize={20} IconJSX={Gallery} hasBorder={false} />
        <Text style={styles.selectText}>{t('settings.selectGallery')}</Text>
      </Pressable>

      <Pressable onPress={() => onPress(true)} style={styles.rulesWrapper}>
        <IconComponent customIconSize={20} IconJSX={Camera} hasBorder={false} />
        <Text style={styles.deleteText}>{t('settings.deletePhoto')}</Text>
      </Pressable>
    </View>
  );
};
