import { defineStore } from 'pinia';

export interface ModalStore {
  modalActive: boolean;
  modalTitle: string;
  modalIcon: string;
  modalContent: string;
  modalSize: 'md' | 'lg' | 'xl';
  modalObjectLookup: string;
}

export const defaultModalSize = 'lg';

export const useModalStore = defineStore('modal', {
  state: (): ModalStore => {
    return {
      modalActive: false,
      modalTitle: '',
      modalIcon: '',
      modalContent: '',
      modalSize: defaultModalSize,
      modalObjectLookup: '',
    };
  },
  actions: {
    async closeModal() {
      this.modalActive = false;
      this.modalSize = defaultModalSize;
    },
    openModal(
      content: ModalStore['modalContent'],
      title: ModalStore['modalTitle'],
      icon: ModalStore['modalIcon'],
      size: ModalStore['modalSize'] = 'lg',
      modalObjectLookup: ModalStore['modalObjectLookup'] = '',
    ) {
      this.modalActive = true;
      this.modalContent = content;
      this.modalTitle = title;
      this.modalIcon = icon ? icon : '';
      this.modalSize = size;
      this.modalObjectLookup = modalObjectLookup;
    },
  },
});
