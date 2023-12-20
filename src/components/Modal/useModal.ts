import {
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ConfigureModal, ModalHandler, TitlePos } from './Modal.types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { config } from 'utils/config';
import { Keyboard, Platform } from 'react-native';

const useModal = (ref: Ref<ModalHandler>) => {
  const device_height = config.mobileHeight;
  const initial_snapPoints = Platform.OS === 'ios' ? device_height * 0.7 : device_height * 0.6;
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
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (keyboardHeight > 0) {
      if (Platform.OS === 'android') {
        setSnapPoints([(device_height - keyboardHeight) * 0.6]);
      }
    }
  }, [device_height, initial_snapPoints, keyboardHeight]);

  const open = (options: ConfigureModal) => {
    setElement(options.element);
    setTitle(options.title);
    setEnablePadding(options.enablePadding);
    options.titlePosition && setTitlePosition(options.titlePosition);
    options.disableDynamicSizing && setEnableDynamicSizing(false);
    options.disablePanning && setEnableContentPanningGesture(false);
    options.snapPoints && setSnapPoints(options.snapPoints);
    options.hideHandle && setHideHandle(options.hideHandle);
    options.hideCloseButton && setHideCloseButton(options.hideCloseButton);
    modalRef?.current?.present();
  };

  const close = () => {
    setElement(null);
    setTitle('');
    setEnablePadding(false);
    setTitlePosition('left');
    setEnableDynamicSizing(true);
    setEnableContentPanningGesture(true);
    setSnapPoints([initial_snapPoints]);
    setHideHandle(false);
    setHideCloseButton(false);
    setElement(null);
    modalRef?.current?.close();
  };

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
