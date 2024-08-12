import { ReactComponent as AlarmIcon } from '../../assets/img/alarm-clock.svg';
import { useNavigate } from 'react-router-dom';

import { RoundedButton } from '../ui/RoundedButton';

import { useAppSelector } from '../../store/hooks';
import { themeSelector } from '../../features/themes/store/themeSlice';
import { Button } from '../utils/Button';
import { MenuButton } from '../theme/MenuButton';
import { IconButton } from '../utils/IconButton';
import { SettingsIcon } from '../utils/icons/SettingsIcon';
import { SymbolButton } from '../utils/SymbolButton';
import { HelpIcon } from '../utils/icons/HelpIcon';
import { RemoteConnectionOld } from '../../features/security/components/RemoteConnectionOld';
import { RemoteConnection } from '../../features/security/components/RemoteConnection';
import { SettingsOld } from '../../features/settings/components/SettingsOld';
import { Settings } from '../../features/settings/components/Settings';

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
      <div className="flex gap-3 items-center">
        {/* <RoundedButton label="Settings" symbol="⚙" onClick={() => console.log('Settings button')} /> */}
        {/* <SettingsOld /> */}
        <Settings />

        {/* <RoundedButton label="Help" symbol="?" onClick={() => navigate('/help')} /> */}
        <MenuButton icon={<HelpIcon />} onClick={() => navigate('/help')}>
          Help
        </MenuButton>
        {/* <HelpWrapper /> */}

        {/* <RemoteConnectionOld /> */}
        <RemoteConnection />
      </div>
    </header>
  );
}
