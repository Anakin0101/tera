import { CommonActions } from '@react-navigation/native';
import references from 'utils/references';

/**
 * Save reference to navigator.
 */
export const saveReference = (navigator: any) => {
  references.navigator = navigator;
};

/**
 * Manual navigation.
 */
export const goTo = (stack: string, screen: string, state?: any) => {
  references.navigator?.dispatch(CommonActions.navigate(stack, { screen, params: state }));
};

/**
 * Navigate.
 */
export const navigate = (screen: string) =>
  references.navigator?.dispatch(CommonActions.navigate(screen));

/**
 * Get current route name.
 */
export const getCurrentRoute = () => {
  return references.navigator?.getCurrentRoute()?.name;
};
