import { ReactComponent as CrossIcon } from '../../assets/img/cross.svg';

type Props = {
  onCloseClick: (e: React.MouseEvent<HTMLElement>) => void;
  light?: boolean;
};

export const CloseBtn = ({ onCloseClick, light = true }: Props) => {
  return (
    <button
      aria-label="Close"
      onClick={onCloseClick}
      className={`border-none bg-transparent ml-auto cursor-pointer`}
    >
      <CrossIcon
        className={`w-5 h-5 cursor-pointer ${light ? 'fill-neutral-50' : 'fill-neutral-600'} `}
      />
    </button>
  );
};
