import { useState } from 'react';

import { CopyToClipboardBtn } from '../../../components/ui/CopyToClipboardBtn';
import { ApiKey } from '../data/types';
import { Heading2, Heading3, HR, Section } from '../../../components/theme/layout';
import { KeyIcon } from '../../../components/utils/icons/KeyIcon';

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
    <Section>
      <Heading2>
        Status: <span className="text-green-500">connected</span>
      </Heading2>
      <p className="text-sm">
        Your tasks will be saved on the server. Use the assosiated key to give access to another
        device/co player that you want to share them with.{' '}
        <span className="font-semibold">
          Make sure you trust whoever you give this key as they will have full access to your tasks.
        </span>
      </p>

      <HR />

      <Heading3>Your Key</Heading3>
      <div className="md:w-11/12 mx-auto">
        <div className="flex gap-4 md:gap-7 text-sm md:text-base py-2 mb-4">
          <KeyIcon />
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

        {keyIsVisible && (
          <div className="relative mb-4">
            <CopyToClipboardBtn textToCopy={apiKey.token} />
            <textarea
              readOnly
              value={apiKey.token}
              className="w-full p-4 pe-24 text-xs rounded-md border border-stone-200 focus:outline-none bg-white bg-opacity-40 grow"
            />
          </div>
        )}

        <div className="flex items-center mb-4">
          <input
            checked={deleteChecked}
            type="checkbox"
            className="w-4 h-4 rounded border border-stone-200 focus:outline-none"
            onChange={() => setDeleteChecked(!deleteChecked)}
          />
          <label className="ms-2 text-sm font-medium text-gray-600/80">
            on remove, delete the key forever
          </label>
        </div>
      </div>
    </Section>
  );
};
