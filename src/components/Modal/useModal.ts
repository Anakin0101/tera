import { ReactNode, Ref, useImperativeHandle, useRef, useState } from 'react';
import { ConfigureModal, ModalHandler, TitlePos } from './Modal.types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const useModal = (ref: Ref<ModalHandler>) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [element, setElement] = useState<ReactNode>(null);
  const [title, setTitle] = useState<ReactNode>('');
  const [enablePadding, setEnablePadding] = useState<boolean | undefined>(false);
  const [titlePosition, setTitlePosition] = useState<TitlePos>('left');
  const [enableDynamicSizing, setEnableDynamicSizing] = useState(true);
  const [enableContentPanningGesture, setEnableContentPanningGesture] = useState(true);
  const [snapPoints, setSnapPoints] = useState<(string | number)[]>(['70%']);
  const [hideHandle, setHideHandle] = useState(false);

  const open = (options: ConfigureModal) => {
    setElement(options.element);
    setTitle(options.title);
    setEnablePadding(options.enablePadding);
    options.titlePosition && setTitlePosition(options.titlePosition);
    options.disableDynamicSizing && setEnableDynamicSizing(false);
    options.disablePanning && setEnableContentPanningGesture(false);
    options.snapPoints && setSnapPoints(options.snapPoints);
    options.hideHandle && setHideHandle(options.hideHandle);
    modalRef?.current?.present();
  };

  const close = () => {
    setTitle('');
    setTitlePosition('left');
    setEnableDynamicSizing(true);
    setEnableContentPanningGesture(true);
    setSnapPoints(['70%']);
    setHideHandle(false);
    setElement(null);
    modalRef?.current?.close();
    setEnablePadding(false);
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
  };
};

export default useModal;
