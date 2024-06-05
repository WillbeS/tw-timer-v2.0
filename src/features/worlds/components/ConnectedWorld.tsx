import { useState } from 'react';
import { WorldData } from '../../../data/types';
import { CopyToClipboardBtn } from '../../../components/ui/CopyToClipboardBtn';

type Props = {
  world: WorldData;
  token: string;
  onRemove: (worldTag: string) => void;
};

export const ConnectedWorld = ({ world, token, onRemove }: Props) => {
  const [keyIsVisible, setKeyIsVisible] = useState(false);

  const handleRemove = () => {
    onRemove(world.tag);
  };

  const toggleKeyVisibility = () => {
    setKeyIsVisible((prev) => !prev);
  };

  return (
    <div className="w-11/12 md:w-3/4 mx-auto">
      <div className="flex gap-3 md:gap-5 text-sm md:text-base py-1">
        <span className="font-bold">{world.name}</span>
        <span onClick={toggleKeyVisibility} className="cursor-pointer underline text-blue-700">
          {keyIsVisible ? 'Hide key' : 'Show key'}
        </span>
        <span onClick={handleRemove} className="cursor-pointer underline text-red-700">
          Remove
        </span>
      </div>
      {keyIsVisible && (
        <div className="relative">
          <CopyToClipboardBtn textToCopy={token} />
          <textarea className="w-full p-4 pe-24 text-xs rounded-md border border-stone-200 focus:outline-none bg-white bg-opacity-40 grow">
            {token}
          </textarea>
        </div>
      )}
    </div>
  );
};
