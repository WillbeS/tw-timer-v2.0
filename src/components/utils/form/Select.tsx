import { ValidationError } from './ValidationError';

interface SelectProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  value: string | undefined;
  defaultValue?: string;
  validationError?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;

  children?: React.ReactNode;
}

export const Select = ({
  onChange,
  label,
  value,
  validationError,
  textColor = 'text-gray-900',
  bgColor = 'bg-white/50',
  borderColor = 'border-black/15',

  children,
}: SelectProps) => {
  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium ${textColor}`}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`${bgColor} border ${borderColor} ${textColor} text-sm rounded-lg focus:outline-none block w-full p-2.5`}
      >
        {children}
      </select>
      <ValidationError fieldError={validationError} />
    </>
  );
};
