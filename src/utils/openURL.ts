import { Linking } from 'react-native';

export const openURL = (url: string) => {
  return Linking.canOpenURL(url)
    .then(() => {
      Linking.openURL(url);
    })
    .catch(err => console.error('An error occurred', err, url));
};
