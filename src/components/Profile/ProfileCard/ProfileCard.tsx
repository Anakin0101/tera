import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useStyleTheme } from './ProfileCard.styles';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { Text } from 'components/Text/Text';
import { ProfileCardType } from '../ProfileCards/ProfileCards.types';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';

export const ProfileCardComponent = (props: ProfileCardType) => {
  const styles = useStyleTheme();
  const { icon, text, extraData, absolute, navigateTo, pressFn } = props;
  const { navigate } = useNavigation<ModalStackScreenProps<'AtmsAndBranchesScreen'>>();

  const handlePress = useCallback(() => {
    if (navigateTo) {
      if (typeof navigateTo === 'object') {
        const { screen, stack } = navigateTo;
        navigate(stack, {
          screen: screen,
        });
      } else {
        navigate?.(navigateTo);
      }
    } else {
      pressFn?.();
    }
  }, [navigate, navigateTo, pressFn]);

  return (
    <Pressable style={styles.profileCardContainer} onPress={handlePress}>
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
      <View style={styles.textContainer}>
        <Text style={styles.profileCardText} children={text} numberOfLines={2} />
      </View>
    </Pressable>
  );
};

export const ProfileCard = React.memo(ProfileCardComponent);
