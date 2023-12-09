import { ReactComponent as AlarmIcon } from '../../assets/img/alarm-clock.svg';
import { useNavigate } from 'react-router-dom';

import { RoundedButton } from '../ui/RoundedButton';
import { HelpWrapper } from '../../features/help/components/HelpWrapper';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className={`flex items-center justify-between py-4 border-b border-yellow-900`}>
      <h1 className="flex cursor-pointer" onClick={() => navigate('')}>
        <span>
          <AlarmIcon className="w-7" />
        </span>
        <span className="text-lg md:text-xl text-white font-bold ml-2">TW Timer</span>
      </h1>
      {/* Buttons */}
      <div className="flex gap-3">
        <RoundedButton label="Settings" symbol="⚙" onClick={() => console.log('Settings button')} />
        {/* <RoundedButton label="Help" symbol="?" onClick={() => navigate('/help')} /> */}
        <HelpWrapper />
      </div>
    </header>
  );
}
