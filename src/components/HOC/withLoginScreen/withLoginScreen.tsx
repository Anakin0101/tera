import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyleTheme } from './withLoginScreen.styles';
import { LanguageSwitcher } from 'components/LanguageSwitcher/LanguageSwitcher';

/**
 *
 * @param WrappedComponent  - a React component
 * @param screenNameString  - a string,which represents the name of a screen, where navigation should happen
 * @param resolverFn  - extending withLogin screen to resolve conditional screenName redirection (navigation)
 * resolverFunction is needed because of conditional rendering of PasswordLoginScreen and PasswordOnlyLoginScreen - depending on userName (whether it has been saved or not)
 *     // See the example inside OnboardingScreen
 * @returns React component - with extended behavior - (with handleNavigation optinal function) and shared UI styles
 */
export const withLoginScreen = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const styles = useStyleTheme();

    return (
      <SafeAreaView style={styles.loginScreenContainerStyle}>
        <View style={styles.loginScreenWrapperStyle}>
          <View style={styles.languageSwitcherContainer}>
            <LanguageSwitcher />
          </View>
          <View style={styles.wrappedComponentWrapperStyle}>
            <WrappedComponent {...(props as P)} />
          </View>
        </View>
      </SafeAreaView>
    );
  };
};
