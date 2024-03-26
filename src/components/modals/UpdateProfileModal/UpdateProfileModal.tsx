import React from 'react';
import { Pressable, View } from 'react-native';
import { IconComponent, Text } from 'components';
import { Camera, Gallery } from 'assets/SVGs';
import { useStyles } from './UpdateProfileModal.styles';
import { ModalPropsType } from './UpdateProfileModal.types';

export const UpdateProfileModal = ({ onPress }: ModalPropsType) => {
  const styles = useStyles();

  return (
    <View>
      <Pressable onPress={() => onPress(false)} style={styles.rulesWrapper}>
        <IconComponent customIconSize={20} IconJSX={Gallery} hasBorder={false} />
        <Text style={styles.selectText} children={'settings.selectGallery'} />
      </Pressable>

      <Pressable onPress={() => onPress(true)} style={styles.rulesWrapper}>
        <IconComponent customIconSize={20} IconJSX={Camera} hasBorder={false} />
        <Text style={styles.deleteText} children={'settings.deletePhoto'} />
      </Pressable>
    </View>
  );
};
