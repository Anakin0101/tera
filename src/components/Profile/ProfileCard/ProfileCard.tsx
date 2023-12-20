import React from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './ProfileCard.styles';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { Text } from 'components/Text/Text';
import { ProfileCardType } from '../ProfileCards/ProfileCards.types';

export const ProfileCard = (props: ProfileCardType) => {
  const styles = useStyleTheme();
  const { icon, text } = props;
  return (
    <View style={styles.profileCardContainer}>
      <IconComponent
        pngLocalIcon={icon}
        customIconComponentStyles={styles.profileCardStyles}
        customIconSize={22}
      />
      <Text style={styles.profileCardText} children={text} />
    </View>
  );
};
