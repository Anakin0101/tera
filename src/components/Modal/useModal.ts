import { ReactNode, Ref, useImperativeHandle, useRef, useState } from 'react';
import { ConfigureModal, ModalHandler, TitlePos } from './Modal.types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Keyboard, Platform } from 'react-native';
import { ModalConfig } from 'constants/index';
import { debounce } from 'utils/debounce';

const useModal = (ref: Ref<ModalHandler>) => {
  const initial_snapPoints =
    Platform.OS === 'ios'
      ? ModalConfig.MODAL_HEIGHT_IOS
      : ModalConfig.MODAL_HEIGHT_WITHOUT_KEYBOARD_ANDROID;
  const modalRef = useRef<BottomSheetModal>(null);
  const [element, setElement] = useState<ReactNode>(null);
  const [title, setTitle] = useState<ReactNode>('');
  const [enablePadding, setEnablePadding] = useState<boolean | undefined>(false);
  const [titlePosition, setTitlePosition] = useState<TitlePos>('left');
  const [enableDynamicSizing, setEnableDynamicSizing] = useState(true);
  const [enableContentPanningGesture, setEnableContentPanningGesture] = useState(true);
  const [snapPoints, setSnapPoints] = useState<(string | number)[]>([initial_snapPoints]);
  const [hideHandle, setHideHandle] = useState(false);
  const [hideCloseButton, setHideCloseButton] = useState(false);

  const open = (options: ConfigureModal) => {
    setElement(options.element);
    setTitle(options.title);
    setEnablePadding(options.enablePadding);
    options.titlePosition && setTitlePosition(options.titlePosition);
    options.disableDynamicSizing && setEnableDynamicSizing(false);
    options.disablePanning && setEnableContentPanningGesture(false);
    options.snapPoints && setSnapPoints(options.snapPoints);
    options.withKeyboard &&
      setSnapPoints([
        Platform.OS === 'ios'
          ? ModalConfig.MODAL_HEIGHT_IOS
          : ModalConfig.MODAL_HEIGHT_WITH_KEYBOARD_ANDROID,
      ]);
    options.hideHandle && setHideHandle(options.hideHandle);
    options.hideCloseButton && setHideCloseButton(options.hideCloseButton);
    modalRef?.current?.present();
  };

  const close = () => {
    handleModalClose();
  };

  const handleModalClose = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    if (Platform.OS === 'ios') {
      handleClose();
    } else {
      handleDelayedClose();
    }
  };

  const handleClose = () => {
    setElement(null);
    setTitle('');
    setEnablePadding(false);
    setTitlePosition('left');
    setEnableDynamicSizing(true);
    setEnableContentPanningGesture(true);
    setSnapPoints([initial_snapPoints]);
    setHideHandle(false);
    setHideCloseButton(false);
    modalRef?.current?.close();
  };

  //   Temporary solution for android
  // When there is a keyboard visible inside modal, onClose() does not close the modal, but still small part of modal stays visible.
  // As a temporary solution, debounce works
  const handleDelayedClose = debounce(() => {
    handleClose();
  }, 100);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return {
    modalRef,
    title,
    element,
    close,
    titlePosition,
    enableDynamicSizing,
    enableContentPanningGesture,
    snapPoints,
    hideHandle,
    enablePadding,
    hideCloseButton,
  };
};

export default useModal;
