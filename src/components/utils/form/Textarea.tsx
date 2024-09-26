import { ComponentPropsWithoutRef } from 'react';
import { ValidationError } from './ValidationError';

type TextareaProps = {
  label?: string;
  size?: 'small' | 'base' | 'large';
  validationError?: string;
} & ComponentPropsWithoutRef<'textarea'>;

export const Textarea = ({
  label,
  size = 'base',
  validationError,
  ...restTextareaProps
}: TextareaProps) => {
  const sizeStyles = {
    small: 'text-sm p-1.5 font-base',
    base: 'text-md p-2 font-medium',
    large: 'text-lg p-2.5 font-medium',
  };

  const addedStyles = restTextareaProps.className;
  delete restTextareaProps.className;

  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium  text-gray-900`}>{label}</label>}
      <textarea
        className={`bg-white/50 border border-black/15 text-gray-900 rounded-lg focus:outline-none block w-full ${sizeStyles[size]} ${addedStyles}`}
        {...restTextareaProps}
      />
      <ValidationError fieldError={validationError} />
    </>
  );
};
