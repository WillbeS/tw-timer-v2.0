import { BasicModal } from '../../../components/theme';
import { ScreenThumb } from './ScreenThumb';
import { SlideImage } from '../data/types';
import { useModal } from '../../../components/theme/hooks/useModal';
import { Slideshow } from '../../../components/utils/Slideshow';
import { FRAME_DURATION, SLIDE_IMAGES_DIR } from '../data/const';

interface ScrrensSlideProps {
  title: string;
  thumbName: string;
  images: SlideImage[];
}

export const ScreensSlide = ({ title, thumbName, images }: ScrrensSlideProps) => {
  const { modalOpened, onCloseModal, onOpenModal } = useModal();

  return (
    <BasicModal
      openBtn={<ScreenThumb title={title} imageName={thumbName} />}
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
