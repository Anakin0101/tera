import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import { checkCameraGalleryPermissions } from './persmissionChecker';

/**
 * Function to pick an image from the gallery.
 * @param {ImageLibraryOptions} pickerOptions - Options for the image picker.
 * @param {(response: ImagePickerResponse | boolean) => void} callBack - Callback function to handle the response.
 * @returns {Promise<void>} A promise that resolves when the image picker is used successfully.
 */
export const UseGalleryPicker = async (
  pickerOptions: ImageLibraryOptions,
  callBack: (reps: ImagePickerResponse | boolean) => void,
) => {
  if (!(await checkCameraGalleryPermissions())) {
    return;
  }

  const options: ImageLibraryOptions = { ...pickerOptions, assetRepresentationMode: 'compatible' };

  setTimeout(async () => {
    await launchImageLibrary(options, response => {
      let respSource = response as ImagePickerResponse | false;
      if (response.didCancel) {
        console.warn('User cancelled image picker');
        respSource = false;
      } else if (response.errorMessage) {
        console.warn('ImagePicker Error: ', response.errorMessage);
        respSource = false;
      }
      callBack(respSource);
    });
  }, 350);
};

/**
 * Function to capture an image using the device camera.
 * @param {CameraOptions} pickerOptions - Options for the camera picker.
 * @param {(response: ImagePickerResponse | boolean) => void} callBack - Callback function to handle the response.
 * @returns {Promise<void>} A promise that resolves when the camera picker is used successfully.
 */
export const UseCameraPicker = async (
  pickerOptions: CameraOptions,
  callBack: (reps: ImagePickerResponse | boolean) => void,
) => {
  if (!(await checkCameraGalleryPermissions())) {
    return;
  }

  const options: ImageLibraryOptions = pickerOptions;

  setTimeout(async () => {
    await launchCamera(options, response => {
      let respSource = response as ImagePickerResponse | false;
      if (response.didCancel) {
        console.warn('User cancelled Camera picker');
        respSource = false;
      } else if (response.errorMessage) {
        console.warn('CameraPicker Error: ', response.errorMessage);
        respSource = false;
      }
      callBack(respSource);
    });
  }, 350);
};
