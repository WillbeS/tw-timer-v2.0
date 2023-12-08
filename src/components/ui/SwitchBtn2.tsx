import { useState } from 'react';

type Props = {
  onToggle?: (state: boolean) => void;
};

export function SwitchBtn2({ onToggle }: Props) {
  const [isOn, setOn] = useState(false);

  const getImgPath = () => `img/switch-${isOn ? 'on' : 'off'}.svg`;

  const handleClick = () => {
    setOn(!isOn);

    if (onToggle) {
      onToggle(isOn);
    }
  };

  return (
    <img
      onClick={handleClick}
      className="w-9 cursor-pointer"
      src={getImgPath()}
      alt="switch on/off button"
    />
  );
}
