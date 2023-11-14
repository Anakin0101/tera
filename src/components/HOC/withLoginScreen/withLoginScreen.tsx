import { LanguageSwitcher } from 'components/LanguageSwitcher/LanguageSwitcher';
import React, { ComponentType } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyleTheme } from './withLoginScreen.styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GuestStackScreenProps, GuestStackParamList } from 'navigation/types';
import { useKeyChain } from 'hooks/useKeychain';
import { Button } from 'components/Button/Button';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { changeTheme } from 'store/slices/theme';

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
  screenNameString: T | undefined,
  resolverFn?: (dependency: string) => T,
) => {
  return (props: WithLoginScreenProps) => {
    const { savedUserName } = useKeyChain();

    const dispatch = useAppDispatch();
    const { dark: isDark } = useTheme();

    const screenName =
      screenNameString && typeof screenNameString === 'string'
        ? screenNameString
        : resolverFn?.(savedUserName || '');

    const styles = useStyleTheme();
    const { navigate } = useNavigation<GuestStackScreenProps<T>>();

    const fakeLogin = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    };

    const handleNavigation = async () => {
      try {
        await fakeLogin();
        if (screenName) {
          navigate(screenName as keyof GuestStackParamList);
        }
      } catch (error) {
        console.error('Login failed', error);
      }
    };

    const handleThemeChange = () => {
      dispatch(changeTheme({ darkMode: !isDark }));
    };

    return (
      <SafeAreaView style={styles.loginScreenContainerStyle}>
        <View style={styles.loginScreenWrapperStyle}>
          <View style={styles.languageSwitcherContainer}>
            <LanguageSwitcher />
          </View>
          <View style={styles.languageSwitcherContainer}>
            <Button.Primary onPress={handleThemeChange}>
              <Text>Change the theme - temporary</Text>
            </Button.Primary>
          </View>
          <View style={styles.wrappedComponentWrapperStyle}>
            <WrappedComponent {...(props as P)} handleNavigation={handleNavigation} />
          </View>
        </View>
      </SafeAreaView>
    );
  };
};
