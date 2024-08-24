import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

type Props = {
  toggleBtn?: React.ReactNode;
  toggleBtnLabel?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonHoverColor?: string;
  menuBgColor?: string;
  menuTextColor?: string;
  children: React.ReactNode;
};

export const DropdownMenu = ({
  toggleBtn,
  toggleBtnLabel = 'Dropdown',
  buttonBgColor,
  buttonTextColor,
  buttonHoverColor,
  menuBgColor = 'bg-white',
  menuTextColor = 'text-black',
  children,
}: Props) => {
  const [isOpen, setisOpen] = useState(false);
  const catMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOpenMenus = (e: Event) => {
      const target = e.target as HTMLDivElement;

      if (catMenu.current && isOpen && target && !catMenu.current.contains(target)) {
        setisOpen(false);
      }
    };

    // console.log('addEventListener');
    document.addEventListener('mousedown', closeOpenMenus);

    return () => {
      // console.log('removeEventListener');
      document.removeEventListener('mousedown', closeOpenMenus);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setisOpen((prevState) => !prevState);
  };

  // console.log('addEventListener');
  // document.addEventListener('mousedown', closeOpenMenus);

  return (
    <div ref={catMenu} onClick={toggleOpen} className="relative w-fit">
      {toggleBtn ? (
        toggleBtn
      ) : (
        <Button bgColor={buttonBgColor} textColor={buttonTextColor} bgHoverColor={buttonHoverColor}>
          {toggleBtnLabel}
        </Button>
      )}

      {isOpen && (
        <div
          className={`absolute right-0 rounded-md drop-shadow-md cursor-pointer w-max mt-2 py-1 px-0 z-10 text-sm font-medium ${menuBgColor} ${menuTextColor}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
