import React, { forwardRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import useModal from './useModal';
import { ModalHandler } from './Modal.types';
import { useStyles } from './Modal.styles';
import { Close } from 'assets/SVGs';
import { Text } from '../index';

const Backdrop = (props: BottomSheetBackdropProps) => {
  return <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />;
};

export const Modal = forwardRef<ModalHandler>((_, ref) => {
  const {
    modalRef,
    element,
    close,
    title,
    titlePosition,
    enableDynamicSizing,
    enableContentPanningGesture,
    snapPoints,
    hideHandle,
    enablePadding = false,
    hideCloseButton,
  } = useModal(ref);
  const styles = useStyles();

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      keyboardBehavior="extend"
      keyboardBlurBehavior={Platform.OS === 'ios' ? 'none' : 'restore'}
      ref={modalRef}
      enableDynamicSizing={enableDynamicSizing}
      backdropComponent={Backdrop}
      handleStyle={styles.handle}
      // eslint-disable-next-line react-native/no-inline-styles
      handleIndicatorStyle={[styles.handleIndicator, hideHandle && { height: 0 }]}
      enableContentPanningGesture={enableContentPanningGesture}
      android_keyboardInputMode="adjustPan"
      enablePanDownToClose={true}
    >
      <BottomSheetView style={enablePadding ? styles.paddingContainer : styles.container}>
        <View style={title ? styles.titleContainer : null}>
          {titlePosition === 'center' && <View />}
          {title && <Text style={styles.title}>{title}</Text>}
          {!hideCloseButton && (
            <Pressable onPress={close} style={styles.closeButton}>
              <Close />
            </Pressable>
          )}
        </View>
        {element}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
