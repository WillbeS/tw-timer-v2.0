import { ValidationError } from './ValidationError';

interface TextareaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  label?: string;
  value: string;
  rows?: number;
  size?: 'small' | 'base' | 'large';
  placeholder?: string;
  validationError?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
}

export const Textarea = ({
  onChange,
  onKeyDown,
  label,
  value,
  rows = 4,
  size = 'base',
  placeholder,
  validationError,
  textColor = 'text-gray-900',
  bgColor = 'bg-white/50',
  borderColor = 'border-black/15',
}: TextareaProps) => {
  const sizeStyles = {
    small: 'text-sm p-1.5 font-base',
    base: 'text-md p-2 font-medium',
    large: 'text-lg p-2.5 font-medium',
  };

  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium ${textColor}`}>{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        rows={rows}
        className={`${bgColor} border ${borderColor} ${textColor} rounded-lg focus:outline-none block w-full ${sizeStyles[size]}`}
        placeholder={placeholder}
      />
      <ValidationError fieldError={validationError} />
    </>
  );
};
