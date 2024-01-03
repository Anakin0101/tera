import { config } from 'utils/config';

const MODAL_HEIGHT_IOS = config.mobileHeight * 0.7;
const MODAL_HEIGHT_WITH_KEYBOARD_ANDROID = config.mobileHeight * 0.4;
const MODAL_HEIGHT_WITHOUT_KEYBOARD_ANDROID = config.mobileHeight * 0.7;

export const ModalConfig = {
  MODAL_HEIGHT_IOS,
  MODAL_HEIGHT_WITH_KEYBOARD_ANDROID,
  MODAL_HEIGHT_WITHOUT_KEYBOARD_ANDROID,
};

ModalConfig.MODAL_HEIGHT_WITHOUT_KEYBOARD_ANDROID;
