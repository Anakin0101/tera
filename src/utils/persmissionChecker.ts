import i18next from 'i18next';
import { Alert } from 'react-native';
import Contacts from 'react-native-contacts';

enum contactPermissionValue {
  authorized = 'authorized',
  denied = 'denied',
  undefined = 'undefined',
}

export const checkContactsPermissions = async () => {
  try {
    const checkPermission = await Contacts.checkPermission();

    if (checkPermission !== contactPermissionValue.authorized) {
      const checkResult = await Contacts.requestPermission();
      if (checkResult !== contactPermissionValue.authorized) {
        Alert.alert(i18next.t('permissions.message'), i18next.t('permissions.contactsPermissions'));
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } catch (ex) {
    console.warn('checkContactsPermissions', ex);
    return false;
  }
};
