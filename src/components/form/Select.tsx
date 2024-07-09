import { useState, ChangeEvent } from 'react';

import { theme } from '../../themes';

type Option = {
  value?: string;
  label: string;
};

type Props = {
  options: Option[];
  onChange?: (value: string) => void;
  label?: string | null;
  defaultValue?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

export const Select = ({
  label = null,
  options = [],
  defaultValue = '-1',
  onChange,
  placeholder = 'Select a value',
  fullWidth = false,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const selectStyle = `rounded-md ${theme.borderColors.button} focus:outline-none px-3 py-2 ${
    theme.bgColors.button
  } ${
    theme.textColors.button
  } font-semibold text-sm md:text-base drop-shadow-sm border-none focus:ring-0 ${
    fullWidth ? ' w-full cursor-pointer' : ''
  }`;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);

    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <>
      {label ? <label>{label}</label> : null}
      <select className={selectStyle} value={selectedValue} onChange={handleChange}>
        <option value="-1" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => {
          let { value, label } = option;
          value = value ? value : label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
};
