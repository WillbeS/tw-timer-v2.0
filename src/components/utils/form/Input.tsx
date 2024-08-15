import { ValidationError } from './ValidationError';

interface InputProps {
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
  size?: 'small' | 'base' | 'large';
  placeholder?: string;
  validationError?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
}

export const Input = ({
  type = 'text',
  onChange,
  label,
  value,
  size = 'base',
  placeholder,
  validationError,
  textColor = 'text-gray-900',
  bgColor = 'bg-white/50',
  borderColor = 'border-black/15',
}: InputProps) => {
  const sizeStyles = {
    small: 'text-sm p-1.5 font-base',
    base: 'text-md p-2 font-medium',
    large: 'text-lg p-2.5 font-medium',
  };

  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium ${textColor}`}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`${bgColor} border ${borderColor} ${textColor} rounded-lg focus:outline-none block w-full ${sizeStyles[size]}`}
        placeholder={placeholder}
      />
      <ValidationError fieldError={validationError} />
    </>
  );
};
