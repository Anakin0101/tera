import { Platform } from 'react-native';

export const getSettingsURL = () => {
  return Platform.OS === 'ios' ? 'app-settings:' : 'package:com.myapp';
};
