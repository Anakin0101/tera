import React, { FC } from 'react';
import { withLoginScreen } from 'components/HOC';
import { Carousel } from 'components/index';
import Images from 'theme/Images';
import { PASSWORD_LOGIN_SCREEN, PASSWORD_ONLY_LOGIN_SCREEN } from 'navigation/ScreenNames';

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
  return <Carousel data={data} onSkip={handleNavigation} onTimeout={handleNavigation} withTimer />;
};

export const OnboardingScreen = withLoginScreen<
  OnboardingScreenBaseProps,
  typeof PASSWORD_LOGIN_SCREEN | typeof PASSWORD_ONLY_LOGIN_SCREEN
>(OnboardingScreenBase, undefined, (dependency: string) =>
  dependency ? PASSWORD_ONLY_LOGIN_SCREEN : PASSWORD_LOGIN_SCREEN,
);
