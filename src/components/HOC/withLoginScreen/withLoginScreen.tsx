import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyleTheme } from './withLoginScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { GuestStackScreenProps, GuestStackParamList } from 'navigation/types';
import { LanguageSwitcher } from 'components/LanguageSwitcher/LanguageSwitcher';

interface WithLoginScreenProps {
  handleNavigation?: () => void;
}

/**
 *
 * @param WrappedComponent  - a React component
 * @param screenNameString  - a string,which represents the name of a screen, where navigation should happen
 * @param resolverFn  - extending withLogin screen to resolve conditional screenName redirection (navigation)
 * resolverFunction is needed because of conditional rendering of PasswordLoginScreen and PasswordOnlyLoginScreen - depending on userName (whether it has been saved or not)
 *     // See the example inside OnboardingScreen
 * @returns React component - with extended behavior - (with handleNavigation optinal function) and shared UI styles
 */
export const withLoginScreen = <P extends object, T extends keyof GuestStackParamList>(
  WrappedComponent: ComponentType<P>,
  screenName: T | undefined,
) => {
  return (props: WithLoginScreenProps) => {
    const styles = useStyleTheme();
    const { navigate } = useNavigation<GuestStackScreenProps<T>>();

    const handleNavigation = async () => {
      try {
        if (screenName) {
          navigate(screenName as keyof GuestStackParamList);
        }
      } catch (error) {
        console.warn('Login failed', error);
      }
    };

    return (
      <SafeAreaView style={styles.loginScreenContainerStyle}>
        <View style={styles.loginScreenWrapperStyle}>
          <View style={styles.languageSwitcherContainer}>
            <LanguageSwitcher />
          </View>
          <View style={styles.wrappedComponentWrapperStyle}>
            <WrappedComponent {...(props as P)} handleNavigation={handleNavigation} />
          </View>
        </View>
      </SafeAreaView>
    );
  };
};
