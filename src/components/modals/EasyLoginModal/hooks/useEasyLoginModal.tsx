import { useNavigation } from '@react-navigation/native';
import { AUTHORIZATION_METHODS_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { useMemo } from 'react';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { closeModal } from 'utils/modal';

/**
 * whether to show or hide easy login prompt depends on couple of things:
 * 		1. if user has chosen not to remind him anymore about easy login option
 * 		2. if the user has already set either faceId, fingerPrint or passcode
 * 		3. if the user has postponed easy login option - TODO !! - we need to set it to false when user closes the app or logs out
 * @returns showEasyLoginPrompt: boolean - whether to show easy login modal
 */
export const useEasyLoginModal = () => {
  const navigation = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const { ignoreEasyLogin, postponeEasyLogin } = useAppSelector(state => state.userInfo);
  const { isPasscodeSet, isBiometricSet } = useAppSelector(state => state.userInfo);

  const easyLoginActivated = isPasscodeSet === true || isBiometricSet === true;

  const showEasyLoginPrompt = useMemo(() => {
    return !ignoreEasyLogin && !postponeEasyLogin && !easyLoginActivated;
  }, [ignoreEasyLogin, postponeEasyLogin, easyLoginActivated]);

  /**
   * handles navigation to "AuthorizationMethodsScreen", when "activate" is pressed on the EasyLoginModal
   */
  const handleNavigateToAuthorizationMethodsScreeen = () => {
    closeModal();
    navigation.navigate(MODAL_STACK, {
      screen: AUTHORIZATION_METHODS_SCREEN,
    });
  };

  return {
    showEasyLoginPrompt,
    handleNavigateToAuthorizationMethodsScreeen,
  };
};
