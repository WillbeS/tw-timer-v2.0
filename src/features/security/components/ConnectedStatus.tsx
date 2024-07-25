import { useState } from 'react';

import { CopyToClipboardBtn } from '../../../components/ui/CopyToClipboardBtn';

type Props = {
  token: string;
  onRemove: () => void;
};

export const ConnectedStatus = ({ token, onRemove }: Props) => {
  const [keyIsVisible, setKeyIsVisible] = useState(false);

  const toggleKeyVisibility = () => {
    setKeyIsVisible((prev) => !prev);
  };

  return (
    <section className="mb-4">
      <h2 className="text:md md:text-xl font-semibold mb-2">
        Status: <span className="text-green-500">connected</span>
      </h2>
      <p className="text-sm italic">
        Your tasks will be saved on the server. Use the assosiated key to give access to another
        device/player you want to share them with.
      </p>

      <div className="w-11/12 md:w-3/4 mx-auto">
        <div className="flex gap-3 md:gap-5 text-sm md:text-base py-1">
          <span className="font-bold">Your key</span>
          <span onClick={toggleKeyVisibility} className="cursor-pointer underline text-blue-700">
            {keyIsVisible ? 'Hide' : 'Show'}
          </span>
          <span onClick={onRemove} className="cursor-pointer underline text-red-700">
            Remove
          </span>
        </div>
        {keyIsVisible && (
          <div className="relative">
            <CopyToClipboardBtn textToCopy={token} />
            <textarea
              readOnly
              value={token}
              className="w-full p-4 pe-24 text-xs rounded-md border border-stone-200 focus:outline-none bg-white bg-opacity-40 grow"
            />
          </div>
        )}
      </div>
    </section>
  );
};
