import { BasicModal } from '../../../components/theme';
import { SlideImage } from '../data/types';
import { useModal } from '../../../components/theme/hooks/useModal';
import { Slideshow } from '../../../components/utils/Slideshow';
import { FRAME_DURATION, SLIDE_IMAGES_DIR } from '../data/const';

interface ScrrensSlideProps {
  title: string;
  openBtn: React.ReactNode;
  images: SlideImage[];
}

export const ScreensSlide = ({ title, openBtn, images }: ScrrensSlideProps) => {
  const { modalOpened, onCloseModal, onOpenModal } = useModal();

  return (
    <BasicModal
      openBtn={openBtn}
      heading={`Tutorial - ${title}`}
      maxWidth="max-w-2xl"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
    >
      <div className="rounded-md pb-1">
        {modalOpened && (
          <Slideshow imagesDir={SLIDE_IMAGES_DIR} images={images} duration={FRAME_DURATION} />
        )}
      </div>
    </BasicModal>
  );
};
