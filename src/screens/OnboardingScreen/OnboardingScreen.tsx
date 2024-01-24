import React from 'react';
import { withLoginScreen } from 'components/HOC';
import { Carousel } from 'components/index';
import Images from 'theme/Images';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { View } from 'react-native';
import { useStyleTheme } from './OnboardingScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { GuestStackScreenProps } from 'navigation/types';

const data = [
  {
    title: 'common:onboarding.templates',
    desc: 'common:onboarding.buildTemplates',
    image: Images().onboarding,
  },
  {
    title: 'common:onboarding.templates',
    desc: 'common:onboarding.buildTemplates',
    image: Images().onboarding,
  },
  {
    title: 'common:onboarding.templates',
    desc: 'common:onboarding.buildTemplates',
    image: Images().onboarding,
  },
];

const OnboardingScreenBase = () => {
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();
  const navigateToLoginScreen = () => {
    navigate(PASSWORD_LOGIN_SCREEN);
  };
  const styles = useStyleTheme();
  return (
    <View style={styles.wrapper}>
      <Carousel
        data={data}
        onSkip={navigateToLoginScreen}
        onTimeout={navigateToLoginScreen}
        withTimer
      />
    </View>
  );
};

export const OnboardingScreen = withLoginScreen(OnboardingScreenBase);
