type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
  bgColor?: string;
  bgHoverColor?: string;
  textColor?: string;
  textHoverColor?: string;
  borderColor?: string;
  focusRing?: string;
  size?: string;

  onClick?: () => void;
};

export const Button = ({
  type = 'button',
  children,
  bgColor = 'bg-blue-700',
  bgHoverColor = 'hover:bg-blue-800',
  textColor = 'text-white',
  textHoverColor = 'hover:text-white',
  borderColor,
  size = 'base',
  onClick,
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const sizeStyles: { [key: string]: string } = {
    small: `px-3 py-1.5 text-xs`,
    base: `px-3 py-2 text-sm`,
    large: `px-5 py-3 text-base`,
  };

  const getSizeStyles = () => {
    const existingSize = sizeStyles[size] ? size : 'base';

    return sizeStyles[existingSize];
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      className={`${getSizeStyles()} font-medium text-center ${textColor} ${textHoverColor} ${bgColor} rounded-lg ${bgHoverColor} flex items-center gap-1 focus:outline-none ${
        borderColor && 'border ' + borderColor
      }`}
    >
      {children}
    </button>
  );
};
