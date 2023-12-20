import React from 'react';
import { Pressable, View } from 'react-native';
import { useStyleTheme } from './ProfileListItem.styles';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { Text } from 'components/Text/Text';

import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { ProfileItemType } from 'screens/ProfileScreen/ProfileScreen.types';

export const ProfileListItem = (props: ProfileItemType & { isLast?: boolean }) => {
  const styles = useStyleTheme();
  const { icon, text, navigateTo, isLast, handlePress } = props;
  const { navigate } = useNavigation<ModalStackScreenProps<'SettingsScreen'>>();

  const handleNavigation = () => {
    if (navigateTo) {
      if (typeof navigateTo === 'object') {
        const { screen, stack } = navigateTo;
        navigate(stack, {
          screen: screen,
        });
      } else {
        navigate?.(navigateTo);
      }
    }
  };

  const handleItemPress = () => {
    if (navigateTo) {
      handleNavigation();
    } else {
      handlePress?.();
    }
  };
  return (
    <Pressable style={styles.profileListItemContainer} onPress={handleItemPress}>
      <IconComponent
        IconJSX={icon}
        customIconComponentStyles={styles.profileListItemIconStyles}
        customIconSize={22}
      />
      <View style={styles.profileListItemTextContainer}>
        <Text style={styles.profileListItemText} children={text} />
        {!isLast && <View style={styles.separator} />}
      </View>
    </Pressable>
  );
};
