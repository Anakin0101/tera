import React, { FC } from 'react';
import { withLoginScreen } from 'components/HOC';
import { Carousel } from 'components/index';
import Images from 'theme/Images';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { View } from 'react-native';
import { useStyleTheme } from './OnboardingScreen.styles';

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

interface OnboardingScreenBaseProps {
  handleNavigation?: () => Promise<void>;
}

const OnboardingScreenBase: FC<OnboardingScreenBaseProps> = ({ handleNavigation }) => {
  const styles = useStyleTheme();
  return (
    <View style={styles.wrapper}>
      <Carousel data={data} onSkip={handleNavigation} onTimeout={handleNavigation} withTimer />
    </View>
  );
};

export const OnboardingScreen = withLoginScreen<
  OnboardingScreenBaseProps,
  typeof PASSWORD_LOGIN_SCREEN
>(OnboardingScreenBase, PASSWORD_LOGIN_SCREEN);
