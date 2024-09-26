import { ComponentPropsWithoutRef } from 'react';
import { ValidationError } from './ValidationError';

type InputProps = {
  label?: string;
  validationError?: string;
} & ComponentPropsWithoutRef<'input'>;

export const Input = ({ label, validationError, ...inputProps }: InputProps) => {
  const addedStyles = inputProps.className;
  delete inputProps.className;

  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium text-gray-900`}>{label}</label>}
      <input
        className={`bg-white/50 border border-black/15 text-gray-900 rounded-lg focus:outline-none block w-full text-md p-2 font-medium ${addedStyles}`}
        {...inputProps}
      />
      <ValidationError fieldError={validationError} />
    </>
  );
};
