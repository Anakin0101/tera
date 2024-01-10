import { Linking } from 'react-native';

export const openURL = (url: string) => {
  return Linking.canOpenURL(url)
    .then(() => {
      Linking.openURL(url);
    })
    .catch(err => console.warn('An error occurred', err, url));
};
