import { useState } from 'react';

import { CopyToClipboardBtn } from '../../../components/ui/CopyToClipboardBtn';
import { ApiKey } from '../data/types';

type Props = {
  apiKey: ApiKey;
  onRemove: (token: string, deleteForever: boolean) => void;
};

export const ConnectedStatus = ({ apiKey, onRemove }: Props) => {
  const [keyIsVisible, setKeyIsVisible] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState(false);

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
          <span
            onClick={() => onRemove(apiKey.token, deleteChecked)}
            className="cursor-pointer underline text-red-700"
          >
            Remove
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            checked={deleteChecked}
            type="checkbox"
            className="w-4 h-4 rounded border border-stone-200 focus:outline-none"
            onChange={() => setDeleteChecked(!deleteChecked)}
          />
          <label className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            on remove, delete the key forever
          </label>
        </div>
        {keyIsVisible && (
          <div className="relative">
            <CopyToClipboardBtn textToCopy={apiKey.token} />
            <textarea
              readOnly
              value={apiKey.token}
              className="w-full p-4 pe-24 text-xs rounded-md border border-stone-200 focus:outline-none bg-white bg-opacity-40 grow"
            />
          </div>
        )}
      </div>
    </section>
  );
};
