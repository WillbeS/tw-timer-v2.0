import { ValidationError } from './ValidationError';

interface TextareaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  label?: string;
  value: string;
  rows?: number;
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
  placeholder,
  validationError,
  textColor = 'text-gray-900',
  bgColor = 'bg-white/50',
  borderColor = 'border-black/15',
}: TextareaProps) => {
  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium ${textColor}`}>{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        rows={rows}
        className={`${bgColor} border ${borderColor} ${textColor} text-sm rounded-lg focus:outline-none block w-full p-2.5`}
        placeholder={placeholder}
      />
      <ValidationError fieldError={validationError} />
    </>
  );
};
