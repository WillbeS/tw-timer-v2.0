type Props = {
  symbol: string;
  bgColor?: string;
  bgHoverColor?: string;
  textColor?: string;
  focusRing?: string;
  size?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const SymbolButton = ({
  bgColor = 'bg-blue-700',
  bgHoverColor = 'hover:bg-blue-800',
  textColor = 'text-white',
  size = 'base',
  symbol,
  children,
  onClick,
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const sizeStyles: { [key: string]: string } = {
    small: `px-2 py-1 ${children && 'md:px-3'} text-xs`,
    base: `px-3 py-2 ${children && 'md:px-4'} text-sm`,
    large: `px-4 py-2.5 ${children && 'md:px-5'} text-base`,
  };

  const getSizeStyles = () => {
    const existingSize = sizeStyles[size] ? size : 'base';

    return sizeStyles[existingSize];
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`${getSizeStyles()} font-medium text-center ${textColor} ${bgColor} rounded-lg ${bgHoverColor} flex items-center gap-1 focus:outline-none`}
    >
      <span className="text-xl font-semibold">{symbol}</span>
      <span className="hidden md:inline">{children}</span>
    </button>
  );
};
