import { ComponentPropsWithoutRef } from 'react';
import { ValidationError } from './ValidationError';

type SelectProps = {
  label?: string;
  validationError?: string;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<'select'>;

export const Select = ({ label, validationError, children, ...restSelectProps }: SelectProps) => {
  const addedStyles = restSelectProps.className;
  delete restSelectProps.className;

  return (
    <>
      {label && <label className={`block mb-2 text-sm font-medium text-gray-900`}>{label}</label>}
      <select
        className={`bg-white/50 border border-black/15 text-gray-900 rounded-lg  focus:outline-none block w-full text-md p-2 font-medium ${addedStyles}`}
        {...restSelectProps}
      >
        {children}
      </select>
      <ValidationError fieldError={validationError} />
    </>
  );
};
