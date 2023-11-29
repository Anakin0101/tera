import React, { forwardRef, useMemo } from 'react';
import { Pressable, View } from 'react-native';
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
    enablePadding = false,
  } = useModal(ref);
  const snapPoints = useMemo(() => ['70%'], []);
  const styles = useStyles();

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      keyboardBehavior="extend"
      keyboardBlurBehavior="none"
      ref={modalRef}
      enableDynamicSizing={enableDynamicSizing}
      backdropComponent={Backdrop}
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.handleIndicator}
      enableContentPanningGesture={enableContentPanningGesture}
    >
      <BottomSheetView style={enablePadding ? styles.paddingContainer : styles.container}>
        <View style={title ? styles.titleContainer : null}>
          {titlePosition === 'center' && <View />}
          {title && <Text style={styles.title}>{title}</Text>}
          <Pressable onPress={close} style={styles.closeButton}>
            <Close />
          </Pressable>
        </View>
        {element}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
