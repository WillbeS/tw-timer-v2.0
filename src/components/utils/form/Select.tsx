import { ValidationError } from './ValidationError';

interface SelectProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | undefined;
  label?: string;
  validationError?: string;
  size?: 'small' | 'base' | 'large';
  textColor?: string;
  bgColor?: string;
  bgHoverColor?: string;
  borderColor?: string;
  cursorPointer?: boolean;

  children?: React.ReactNode;
}

export const Select = ({
  onChange,
  value,
  label,
  validationError,
  size = 'base',
  textColor = 'text-gray-900',
  bgColor = 'bg-white/50',
  bgHoverColor = bgColor,
  borderColor = 'border-black/15',
  cursorPointer = false,

  children,
}: SelectProps) => {
  const sizeStyles = {
    small: 'text-sm p-1.5 font-base',
    base: 'text-md p-2 font-medium',
    large: 'text-lg p-2.5 font-medium',
  };

  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium ${textColor}`}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`${bgColor} ${bgHoverColor} border ${borderColor} ${textColor} rounded-lg  focus:outline-none block w-full  ${
          cursorPointer && 'cursor-pointer'
        } ${sizeStyles[size]}`}
      >
        {children}
      </select>
      <ValidationError fieldError={validationError} />
    </>
  );
};
