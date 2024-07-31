import { ReactComponent as AlarmIcon } from '../../assets/img/alarm-clock.svg';
import { useNavigate } from 'react-router-dom';

import { RoundedButton } from '../ui/RoundedButton';

import { RemoteConnection } from '../../features/security/components/RemoteConnection';
import { Settings } from '../../features/settings/components/Settings';
import { useAppSelector } from '../../store/hooks';
import { themeSelector } from '../../features/themes/store/themeSlice';

export function Header() {
  const navigate = useNavigate();
  const { theme } = useAppSelector(themeSelector);

  return (
    <header
      className={`flex items-center justify-between py-4 border-b ${theme.borderColors.main}`}
    >
      <h1 className="flex cursor-pointer" onClick={() => navigate('')}>
        <span>
          <AlarmIcon className={`w-7 ${theme.fillColors.main}`} />
        </span>
        <span className={`text-lg md:text-xl ${theme.textColors.logo} font-bold ml-2`}>
          TW Timer
        </span>
      </h1>
      {/* Buttons */}
      <div className="flex gap-3">
        {/* <RoundedButton label="Settings" symbol="⚙" onClick={() => console.log('Settings button')} /> */}
        <Settings />

        <RoundedButton label="Help" symbol="?" onClick={() => navigate('/help')} />
        {/* <HelpWrapper /> */}

        <RemoteConnection />
      </div>
    </header>
  );
}
