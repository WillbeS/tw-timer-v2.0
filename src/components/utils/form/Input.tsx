import { ValidationError } from './ValidationError';

interface InputProps {
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
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
  placeholder,
  validationError,
  textColor = 'text-gray-900',
  bgColor = 'bg-white/50',
  borderColor = 'border-black/15',
}: InputProps) => {
  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium ${textColor}`}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`${bgColor} border ${borderColor} ${textColor} text-sm rounded-lg focus:outline-none block w-full p-2.5`}
        placeholder={placeholder}
      />
      <ValidationError fieldError={validationError} />
    </>
  );
};
