import { ValidationError } from './ValidationError';

interface InputNumberProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: number;
  placeholder?: string;
  validationError?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
}

export const InputNumber = ({
  onChange,
  label,
  value,
  placeholder,
  validationError,
  textColor = 'text-gray-900',
  bgColor = 'bg-white/50',
  borderColor = 'border-black/15',
}: InputNumberProps) => {
  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium ${textColor}`}>{label}</label>}
      <input
        type="number"
        value={value}
        onChange={onChange}
        className={`${bgColor} border ${borderColor} ${textColor} text-sm rounded-lg focus:outline-none block w-full p-2.5`}
        placeholder={placeholder}
      />
      <ValidationError fieldError={validationError} />
    </>
  );
};
