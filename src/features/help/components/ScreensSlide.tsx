import { BasicModal } from '../../../components/theme';
import { ScreenThumb } from './ScreenThumb';
import { SlideImage } from '../data/types';
import { useModal } from '../../../components/theme/hooks/useModal';
import { Slideshow } from '../../../components/utils/Slideshow';

interface ScrrensSlideProps {
  title: string;
  thumbName: string;
  images: SlideImage[];
}

const imagesDir = 'img/slides';

const duration = 3000;

export const ScreensSlide = ({ title, thumbName, images }: ScrrensSlideProps) => {
  const { modalOpened, onCloseModal, onOpenModal } = useModal();

  return (
    <BasicModal
      openBtn={<ScreenThumb title={title} imageName={thumbName} />}
      heading={`Tutorial - How to ${title}`}
      maxWidth="max-w-2xl"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
    >
      <div className="bg-gray-300">
        {modalOpened && <Slideshow imagesDir={imagesDir} images={images} duration={duration} />}
      </div>
    </BasicModal>
  );
};
