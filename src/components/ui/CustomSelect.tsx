import { useState, useRef } from 'react';
import { ReactComponent as DownArrow } from '../../assets/img/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../assets/img/up-arrow.svg';

type Option = {
  value: string;
  label: string;
};

type Props = {
  onSelect: (value: string) => void;
  options: Option[];
  defaultOption?: Option;
  bgColor?: string;
  txtColor?: string;
  borderColor?: string;
};

export const CustomSelect = ({
  onSelect,
  options,
  defaultOption,
  bgColor = 'yellow-700',
  txtColor = 'white',
  borderColor = 'yellow-800',
}: Props) => {
  const [isOpen, setisOpen] = useState(false);
  defaultOption = defaultOption ? defaultOption : options[0];
  const [selected, setSelected] = useState<Option>(defaultOption);
  const catMenu = useRef<HTMLDivElement>(null); // don't like this name, need a better one

  const toggleOpen = () => {
    setisOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option: Option) => {
    setSelected(option);
    onSelect(option.value);
  };

  const closeOpenMenus = (e: Event) => {
    const target = e.target as HTMLDivElement;

    if (catMenu.current && isOpen && target && !catMenu.current.contains(target)) {
      setisOpen(false);
    }
  };

  document.addEventListener('mousedown', closeOpenMenus);

  return (
    <div ref={catMenu} onClick={toggleOpen} className="relative text-sm w-28 md:w-32">
      <div
        className={`flex items-center justify-between gap-1 p-1 pl-3 pr-2 rounded-md bg-${bgColor} text-${txtColor} cursor-pointer `}
      >
        <span>{selected.label}</span>
        <span>
          {isOpen ? (
            <UpArrow className="w-4 h-4 fill-white ml-1" />
          ) : (
            <DownArrow className="w-4 h-4 fill-white ml-1" />
          )}
        </span>
      </div>
      {isOpen ? (
        <div
          className={`absolute drop-shadow-md cursor-pointer w-full bg-${bgColor} text-${txtColor}`}
        >
          {options.map((option) => {
            const bg = option.value === selected.value ? borderColor : bgColor;

            console.log(option.value);

            return (
              <div
                className={`p-1 pl-3 pr-2 border-t border-${borderColor} hover:bg-yellow-800 bg-${bg}`}
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
