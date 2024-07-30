import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';

type Props = {
  label: string;
  onClick?: () => void;
  symbol?: string;
  bgColor?: string;
  txtColor?: string;
};

export const RoundedButton = ({ label, onClick, symbol, bgColor, txtColor }: Props) => {
  const { theme } = useAppSelector(themeSelector);
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  bgColor = bgColor ? bgColor : theme.bgColors.button;
  txtColor = txtColor ? txtColor : theme.textColors.button;

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 p-1 px-3 rounded-md ${bgColor} ${txtColor}`}
    >
      {symbol ? <span className="text-xl font-bold">{symbol}</span> : null}
      <span className="hidden md:inline text-sm">{label}</span>
    </button>
  );
};
