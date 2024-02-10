import { useState, useRef } from 'react';

import { theme } from '../../themes';

type Props = {
  children: React.ReactNode;
};

export const DropdownMenu = ({ children }: Props) => {
  const [isOpen, setisOpen] = useState(false);
  const catMenu = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setisOpen((prevState) => !prevState);
  };

  const closeOpenMenus = (e: Event) => {
    const target = e.target as HTMLDivElement;

    if (catMenu.current && isOpen && target && !catMenu.current.contains(target)) {
      setisOpen(false);
    }
  };

  document.addEventListener('mousedown', closeOpenMenus);

  return (
    <div ref={catMenu} onClick={toggleOpen} className="relative">
      <div
        className={`rounded-md ${theme.borderColors.button} focus:outline-none px-4 py-1 ${theme.bgColors.button} ${theme.textColors.button} font-semibold text-sm md:text-base drop-shadow-lg  cursor-pointer h-full`}
      >
        <span className="bold text-xl">⋮</span>
      </div>
      {isOpen ? (
        <div
          className={`absolute right-0 rounded-md drop-shadow-md cursor-pointer w-max mt-2 py-1 px-0 z-10 text-sm font-medium ${theme.bgColors.lightBox} ${theme.textColors.lightBox}`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
