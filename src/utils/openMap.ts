import { Linking, Platform } from 'react-native';

export const openMap = (latitude: number, longitude: number, label: string) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${latitude},${longitude}`;

  const url =
    Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    }) || '';

  Linking.openURL(url).catch(() => {
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${latLng}`;
    Linking.openURL(webUrl);
  });
};
