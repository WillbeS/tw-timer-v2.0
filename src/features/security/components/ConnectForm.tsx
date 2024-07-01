import { KeyboardEvent, SyntheticEvent, useState } from 'react';

type Props = {
  onSubmit: (key: string) => void;
};

export const ConnectForm = ({ onSubmit }: Props) => {
  const [key, setKey] = useState('');

  const handleSubmit = async (e: SyntheticEvent | KeyboardEvent) => {
    e.preventDefault();
    onSubmit(key);
    setKey('');
  };

  const fieldStyle =
    'rounded-md border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40 grow';

  return (
    <form className="w-full md:w-3/4 mx-auto p-2" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col mb-5 bg-transparent">
        <textarea
          value={key}
          id="text"
          rows={2}
          placeholder="Paste your key here if you already have one"
          onChange={(e) => setKey(e.target.value)}
          className={fieldStyle}
        />
      </div>
      <div className="flex flex-row gap-2 bg-transparent justify-end">
        <button
          type="submit"
          className="h-8 w-32 p-1 px-3 font-semibold bg-yellow-800 text-stone-100 rounded-md"
        >
          Connect
        </button>
      </div>
    </form>
  );
};
