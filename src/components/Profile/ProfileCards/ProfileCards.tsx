import React from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './ProfileCards.styles';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { ProfileCardsConfig } from './ProfileCards.config';

export const ProfileCards = () => {
  const styles = useStyleTheme();
  return (
    <View style={styles.profileCardsContainer}>
      {ProfileCardsConfig.map(card => {
        return <ProfileCard key={card.id} {...card} />;
      })}
    </View>
  );
};
