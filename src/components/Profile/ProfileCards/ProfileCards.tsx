import React from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './ProfileCards.styles';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { useProfileCards } from './ProfileCards.hooks';

export const ProfileCards = () => {
  const styles = useStyleTheme();
  const { profileCardsConfig } = useProfileCards();
  return (
    <View style={styles.profileCardsContainer}>
      {profileCardsConfig.map(card => {
        return <ProfileCard key={card.id} {...card} />;
      })}
    </View>
  );
};
