import { useState } from 'react';

import { ReactComponent as SwitchToggle } from '../../assets/img/switch-toggle.svg';

type Props = {
  onToggle?: (state: boolean) => void;
};

export const SwitchBtn = ({ onToggle }: Props) => {
  const [isOn, setOn] = useState(false);

  const fillCollor = isOn ? 'fill-green-600' : 'fill-gray-300';
  const marginTop = isOn ? 'mt-0' : '-mt-7';

  const handleClick = () => {
    setOn(!isOn);

    if (onToggle) {
      onToggle(isOn);
    }
  };

  return (
    <span onClick={handleClick} className="inline-block overflow-hidden h-7 cursor-pointer">
      <SwitchToggle className={`w-14 ${fillCollor} ${marginTop}`} />
    </span>
  );
};
