import { textColors } from '../../features/themes/data/blue';
import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';

type Props = {
  bgColor?: string;
  bgHoverColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({
  bgColor = 'bg-blue-700',
  bgHoverColor = 'hover:bg-blue-800',
  textColor = 'text-white',
  children,
  onClick,
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`px-3 py-2 text-sm font-medium text-center ${textColor} ${bgColor} rounded-lg ${bgHoverColor} focus:ring-2 focus:outline-none focus:ring-blue-300`}
    >
      {children}
    </button>
  );
};
