import { ReactNode, Ref, useImperativeHandle, useRef, useState } from 'react';
import { ConfigureModal, ModalHandler, TitlePos } from './Modal.types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const useModal = (ref: Ref<ModalHandler>) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [element, setElement] = useState<ReactNode>(null);
  const [title, setTitle] = useState<ReactNode>('');
  const [titlePosition, setTitlePosition] = useState<TitlePos>('left');
  const [enableDynamicSizing, setEnableDynamicSizing] = useState(true);
  const [enableContentPanningGesture, setEnableContentPanningGesture] = useState(true);

  const open = (options: ConfigureModal) => {
    setElement(options.element);
    setTitle(options.title);
    options.titlePosition && setTitlePosition(options.titlePosition);
    options.disableDynamicSizing && setEnableDynamicSizing(false);
    options.disablePanning && setEnableContentPanningGesture(false);
    modalRef?.current?.present();
  };

  const close = () => {
    setTitle('');
    setTitlePosition('left');
    setEnableDynamicSizing(true);
    setEnableContentPanningGesture(true);
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
  };
};

export default useModal;
