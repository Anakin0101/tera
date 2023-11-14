import { Modal } from 'components';
import { ConfigureModal } from 'components/Modal/Modal.types';
import { ElementRef } from 'react';

type ModalRefType = ElementRef<typeof Modal> | null;

let modal: ModalRefType;

export const saveModalRef = (ref: ModalRefType) => {
  modal = ref;
};

export const openModal = (options: ConfigureModal) => {
  modal?.open(options);
};

export const closeModal = () => {
  modal?.close();
};
