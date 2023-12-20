import React from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './ProfileList.styles';
import { ProfileListItem } from '../ProfileListItem/ProfileListItem';
import { useProfileList } from './ProfileList.hooks';

export const ProfileList = () => {
  const styles = useStyleTheme();
  const { profileListConfig } = useProfileList();
  return (
    <View style={styles.profileListContainer}>
      {profileListConfig.map(card => {
        const isLast = profileListConfig.length - 1 === card.index;
        return <ProfileListItem key={card.id} isLast={isLast} {...card} />;
      })}
    </View>
  );
};
