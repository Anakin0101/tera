import React from 'react';
import { View } from 'react-native';
import { useStyleTheme } from './ProfileCard.styles';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { Text } from 'components/Text/Text';
import { ProfileCardType } from '../ProfileCards/ProfileCards.types';

export const ProfileCardComponent = (props: ProfileCardType) => {
  const styles = useStyleTheme();
  const { icon, text, extraData, absolute } = props;

  return (
    <View style={styles.profileCardContainer}>
      <View style={styles.headerContainer}>
        <IconComponent
          pngLocalIcon={icon}
          customIconComponentStyles={styles.profileCardStyles}
          customIconSize={22}
        />
        {extraData ? (
          <View style={[styles.extraDataContainer, absolute && styles.extraDataAbsoluteStyles]}>
            {extraData}
          </View>
        ) : null}
      </View>
      <Text style={styles.profileCardText} children={text} />
    </View>
  );
};

export const ProfileCard = React.memo(ProfileCardComponent);
