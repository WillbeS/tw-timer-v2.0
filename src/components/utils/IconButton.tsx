type Props = {
  icon: React.ReactNode;
  bgColor?: string;
  bgHoverColor?: string;
  textColor?: string;
  textHoverColor?: string;
  size?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const IconButton = ({
  bgColor = 'bg-blue-700',
  bgHoverColor = 'hover:bg-blue-800',
  textColor = 'text-white',
  textHoverColor = 'hover:text-white',
  size = 'base',
  icon,
  children,
  onClick,
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const sizeStyles: { [key: string]: string } = {
    small: `p-1.5 ${children && 'md:px-3'} text-xs`,
    base: `p-2 ${children && 'md:px-4'} text-sm`,
    large: `p-3 ${children && 'md:px-5'} text-base`,
  };

  const getSizeStyles = () => {
    const existingSize = sizeStyles[size] ? size : 'base';

    return sizeStyles[existingSize];
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`${getSizeStyles()} font-medium text-center ${textColor} ${textHoverColor} ${bgColor} rounded-lg ${bgHoverColor} flex items-center gap-1 focus:outline-none`}
    >
      {icon}
      <span className="hidden md:inline">{children}</span>
    </button>
  );
};
