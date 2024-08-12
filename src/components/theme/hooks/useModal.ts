import { useState } from 'react';

export const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const onOpenModal = () => setModalOpened(true);
  const onCloseModal = () => setModalOpened(false);

  return { modalOpened, onOpenModal, onCloseModal };
};
