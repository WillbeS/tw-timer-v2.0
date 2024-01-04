import { theme } from '../../themes';

type Props = {
  label: string;
  onClick?: () => void;
  symbol?: string;
  bgColor?: string;
  txtColor?: string;
};

export const RoundedButton = ({ label, onClick, symbol, bgColor, txtColor }: Props) => {
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
