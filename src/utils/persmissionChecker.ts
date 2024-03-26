import i18next from 'i18next';
import { Alert, Platform, PlatformAndroidStatic } from 'react-native';
import Contacts from 'react-native-contacts';
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';

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

export const checkCameraGalleryPermissions = async () => {
  if (Platform.OS === 'ios') {
    const results = await checkMultiple([
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.MEDIA_LIBRARY,
      // PERMISSIONS.IOS.CAMERA, // ეს დროებით ჩავაკომენტარე იმისთვის რომ მომავალში გამოვიყენოთ ეს ჩეკი კამერისთვის, ამოვაკომენტარებთ და იმუშავებს ყველა ქეისზე
    ]);
    if (
      results[PERMISSIONS.IOS.PHOTO_LIBRARY] !== RESULTS.GRANTED ||
      results[PERMISSIONS.IOS.MEDIA_LIBRARY] !== RESULTS.GRANTED
      // || results[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED
    ) {
      const checkResult = await requestMultiple([
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.MEDIA_LIBRARY,
        // PERMISSIONS.IOS.CAMERA,
      ]);
      if (checkResult[PERMISSIONS.IOS.PHOTO_LIBRARY] !== RESULTS.GRANTED) {
        Alert.alert('Message', i18next.t('settings.mediaError'));
        return false;
      } else if (checkResult[PERMISSIONS.IOS.MEDIA_LIBRARY] !== RESULTS.GRANTED) {
        Alert.alert('Message', i18next.t('settings.mediaError'));
        return false;
      }
      // else if (checkResult[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED) {
      //   Alert.alert('Message', i18next.t('settings.mediaError'));
      //   return false;
      // }
      else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    const { Release = 13 } = Platform.constants as PlatformAndroidStatic['constants'];
    if (Number(Release) >= 13) {
      const results = await checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        // PERMISSIONS.ANDROID.CAMERA,
      ]);

      if (
        results[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] !== RESULTS.GRANTED ||
        results[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] !== RESULTS.GRANTED
        // || results[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED
      ) {
        const checkResult = await requestMultiple([
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          // PERMISSIONS.ANDROID.CAMERA,
        ]);
        if (
          checkResult[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] !== RESULTS.GRANTED ||
          checkResult[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] !== RESULTS.GRANTED
        ) {
          Alert.alert('Message', i18next.t('settings.mediaError'));
          return false;
        }
        //  else if (checkResult[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED) {
        //   Alert.alert('Message', i18next.t('settings.mediaError'));
        //   return false;
        // }
        else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      const results = await checkMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        // PERMISSIONS.ANDROID.CAMERA,
      ]);

      if (
        results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !== RESULTS.GRANTED ||
        results[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] !== RESULTS.GRANTED
        // || results[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED
      ) {
        const checkResult = await requestMultiple([
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          // PERMISSIONS.ANDROID.CAMERA,
        ]);
        if (
          checkResult[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !== RESULTS.GRANTED ||
          checkResult[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] !== RESULTS.GRANTED
        ) {
          Alert.alert('Message', i18next.t('settings.mediaError'));
          return false;
        }
        //  else if (checkResult[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED) {
        //   Alert.alert('Message', i18next.t('settings.mediaError'));
        //   return false;
        // }
        else {
          return true;
        }
      } else {
        return true;
      }
    }
  }
};
