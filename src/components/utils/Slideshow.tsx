import { useEffect, useRef, useState } from 'react';
import { SlideImage } from '../../features/help/data/types';
import { PlayIcon } from './icons/PlayIcon';

type Opacity = 'opacity-0' | 'opacity-100';
type ZIndex = 'z-20' | 'z-10' | 'z-0';

interface AnimAttributes {
  opacity: Opacity;
  zIndex: ZIndex;
  imageName?: string;
}

interface SlideshowProps {
  imagesDir: string;
  images: SlideImage[];
  duration?: number;
  onRestart?: () => void;
}

export const Slideshow = ({ imagesDir, images, duration = 3000, onRestart }: SlideshowProps) => {
  const index = useRef(0);

  const image1 = useRef<HTMLImageElement>(null);
  const image2 = useRef<HTMLImageElement>(null);
  const image3 = useRef<HTMLImageElement>(null);
  const captionDiv = useRef<HTMLDivElement>(null);
  const playButtton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;

    id = setInterval(() => {
      index.current++;

      if (index.current >= images.length) {
        image1.current!.className = `${imgCommonStyles} z-20 opacity-100 relative`;
        image1.current!.src = `${imagesDir}/${images[0].imageName}`;
        playButtton.current!.className = `absolute ${playButtonStyles}`;

        return;
      }

      if (images[index.current].caption) {
        captionDiv.current!.className = `${captionsStyles} opacity-100`;
        const caption: string = images[index.current].caption as string;
        captionDiv.current!.textContent = caption;
      } else {
        captionDiv.current!.className = `${captionsStyles} opacity-0`;
      }

      const nextImage = images[(index.current + 1) % images.length];

      if (index.current !== 0 && index.current % 3 === 1) {
        setAnimationProps(
          { opacity: 'opacity-0', zIndex: 'z-20' },
          {
            opacity: 'opacity-100',
            zIndex: 'z-10',
          },
          {
            opacity: 'opacity-100',
            zIndex: 'z-0',
            imageName: nextImage.imageName,
          },
        );
      }

      if (index.current !== 0 && index.current % 3 === 2) {
        setAnimationProps(
          {
            opacity: 'opacity-100',
            zIndex: 'z-0',
            imageName: nextImage.imageName,
          },
          { opacity: 'opacity-0', zIndex: 'z-20' },
          {
            opacity: 'opacity-100',
            zIndex: 'z-10',
          },
        );
      }

      if (index.current !== 0 && index.current % 3 === 0) {
        setAnimationProps(
          {
            opacity: 'opacity-100',
            zIndex: 'z-10',
          },
          {
            opacity: 'opacity-100',
            zIndex: 'z-0',
            imageName: nextImage.imageName,
          },
          { opacity: 'opacity-0', zIndex: 'z-20' },
        );
      }
    }, duration);

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, []);

  const setAnimationProps = (
    animAttr1: AnimAttributes,
    animAttr2: AnimAttributes,
    animAttr3: AnimAttributes,
  ) => {
    if (image1.current && image2.current && image3.current) {
      if (animAttr1.imageName) {
        image1.current.src = `${imagesDir}/${animAttr1.imageName}`;
      }

      if (animAttr2.imageName) {
        image2.current.src = `${imagesDir}/${animAttr2.imageName}`;
      }

      if (animAttr3.imageName) {
        image3.current.src = `${imagesDir}/${animAttr3.imageName}`;
      }

      image1.current.className = `${imgCommonStyles} ${animAttr1.zIndex} ${animAttr1.opacity} relative`;
      image2.current.className = `${imgCommonStyles} ${animAttr2.zIndex} ${animAttr2.opacity}`;
      image3.current.className = `${imgCommonStyles} ${animAttr3.zIndex} ${animAttr3.opacity}`;
    }
  };

  const onPlayAgain = () => {
    index.current! = 0;
    playButtton.current!.className = `hidden ${playButtonStyles}`;
    setAnimationProps(
      { opacity: 'opacity-100', zIndex: 'z-20', imageName: images[0].imageName },
      {
        opacity: 'opacity-100',
        zIndex: 'z-10',
        imageName: images[1].imageName,
      },
      {
        opacity: 'opacity-100',
        zIndex: 'z-0',
        imageName: images[2].imageName,
      },
    );
  };

  const imgCommonStyles = 'rounded-md absolute top-0 transition-opacity ease-in duration-500';
  const captionsStyles =
    'absolute top-[82%] md:top-[90%] left-[4%] w-11/12 rounded-md bg-black/80 z-30 text-gray-200 p-1 text-center transition-opacity ease-in duration-500';
  const playButtonStyles =
    'top-[40%] left-[24%] sm:left-[30%] md:left-[40%] px-4 rounded-lg z-40 bg-black/80 hover:bg-gray-800/90 p-2 text-gray-100 cursor-pointer';

  return (
    <>
      <div className="relative">
        <img
          ref={image1}
          className={`${imgCommonStyles} opacity-100 z-20 relative`}
          src={`${imagesDir}/${images[0].imageName}`}
          alt="slideshow"
        />
        <img
          ref={image2}
          className={`${imgCommonStyles} opacity-100 2-10`}
          src={`${imagesDir}/${images[1].imageName}`}
          alt="slideshow"
        />
        <img
          ref={image3}
          className={`${imgCommonStyles} opacity-100 z-0`}
          src={`${imagesDir}/${images[2].imageName}`}
          alt="slideshow"
        />
        <div ref={captionDiv} className={captionsStyles}>
          {images[index.current]?.caption}
        </div>
        <button onClick={onPlayAgain} ref={playButtton} className={`${playButtonStyles} hidden`}>
          <span className="flex gap-2 justify-center">
            Play Again
            <PlayIcon />
          </span>
        </button>
      </div>
    </>
  );
};
