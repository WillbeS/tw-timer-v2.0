import { CrossIcon } from './icons/CrossIcon';

interface CloseButtonProps {
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  onClick?: (e: any) => void;
}

export const CloseButton = ({
  textColor = 'text-gray-500',
  hoverBgColor = 'hover:bg-black/10',
  hoverTextColor = 'hover:text-gray-900/80',
  onClick,
}: CloseButtonProps) => {
  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`${textColor} bg-transparent ${hoverBgColor} ${hoverTextColor} rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center`}
    >
      <CrossIcon />
      <span className="sr-only">Close button</span>
    </button>
  );
};
