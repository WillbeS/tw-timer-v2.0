import { KeyboardEvent, SyntheticEvent, useState } from 'react';
import { Textarea } from '../../../components/utils/form';
import { PrimaryButton } from '../../../components/theme';

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

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="mt-2">
        <Textarea
          size="small"
          value={key}
          rows={2}
          placeholder="Paste your key here if you already have one"
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <PrimaryButton type="submit">Connect</PrimaryButton>
      </div>
    </form>
  );
};
