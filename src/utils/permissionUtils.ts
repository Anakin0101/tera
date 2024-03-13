import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

export const checkLocationPermissions = async () => {
  if (Platform.OS === 'ios') {
    const results = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (results !== RESULTS.GRANTED) {
      const checkResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return checkResult === RESULTS.GRANTED;
    } else {
      return true;
    }
  } else {
    const results = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (results !== RESULTS.GRANTED) {
      const checkResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return checkResult === RESULTS.GRANTED;
    } else {
      return true;
    }
  }
};
