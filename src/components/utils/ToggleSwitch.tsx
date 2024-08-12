import { useState } from 'react';

interface ToggleSwitchProps {
  isOn?: boolean;
  label?: string;
  size?: string;
  bgOffColor?: string;
  bgOnCollor?: string;
  labelColor?: string;
  onToggle?: (on: boolean) => void;
}

export const ToggleSwitch = ({
  isOn = false,
  label,
  size = 'base',
  bgOffColor = 'bg-gray-300',
  bgOnCollor = 'peer-checked:bg-green-500',
  labelColor = 'text-white',
  onToggle,
}: ToggleSwitchProps) => {
  const [checked, setChecked] = useState(isOn);

  const baseStyles =
    'w-9 h-5 after:w-[17px] after:h-[17px] after:top-[1.8px] after:start-[1px] peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:transition-all';

  const largeStyles =
    'w-11 h-6 after:w-5 after:h-5 after:top-[2px] after:start-[2px] peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:transition-all';

  const sizeStyles: { [key: string]: string } = {
    base: baseStyles,
    large: largeStyles,
  };

  const getStylesBySize = () => {
    return sizeStyles[size] ? sizeStyles[size] : sizeStyles['base'];
  };

  const toggleChecked = () => {
    setChecked(!checked);

    if (onToggle) {
      onToggle(checked);
    }
  };

  const bgColor = checked ? bgOnCollor : bgOffColor;

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        {label && <span className={`me-3 text-md font-semibold ${labelColor}`}>{label}</span>}
        <input
          checked={checked}
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={(e) => toggleChecked()}
        />
        <div
          className={`relative ${bgColor} peer-focus:outline-none rounded-full after:content-[''] after:absolute after:bg-white after:rounded-full ${getStylesBySize()}`}
        ></div>
      </label>
    </>
  );
};
