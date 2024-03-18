import { useState } from 'react';
import Geolocation, { GeolocationPosition } from '@react-native-community/geolocation';
import { checkLocationPermissions } from 'utils/permissionUtils';

const useGeolocation = () => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [permission, setPermission] = useState<boolean | undefined>(true);

  const checkPermission = async (): Promise<boolean> => {
    return await checkLocationPermissions().then(perm => {
      setPermission(prevPerm => {
        if (prevPerm !== perm) return perm;
      });
      return perm;
    });
  };
  const locateMe = async () => {
    await checkLocationPermissions().then(perm => {
      setPermission(perm);
      if (perm) {
        const successCallback = (position: GeolocationPosition) => {
          setCoords(prevState => ({
            ...prevState,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        };

        Geolocation.getCurrentPosition(successCallback, e => console.warn(e, 'error'), {
          enableHighAccuracy: false,
          timeout: 12000,
          maximumAge: 3600000,
        });
      } else {
        setCoords({
          latitude: 0,
          longitude: 0,
        });
      }
    });
  };

  return {
    locateMe,
    checkPermission,
    permission,
    coords,
  };
};

export default useGeolocation;
