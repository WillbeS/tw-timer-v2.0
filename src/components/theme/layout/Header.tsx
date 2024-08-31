import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { themeSelector } from '../../../features/themes/store/themeSlice';

import { ReactComponent as AlarmIcon } from '../../../assets/img/alarm-clock.svg';
import { HelpIcon } from '../../utils/icons/HelpIcon';

import { Settings } from '../../../features/settings/components/Settings';
import { MenuButton } from '../MenuButton';
import { RemoteConnection } from '../../../features/security/components/RemoteConnection';

export function Header() {
  const navigate = useNavigate();
  const { theme } = useAppSelector(themeSelector);

  return (
    <header className={`flex items-center justify-between py-4 border-b ${theme.border.header}`}>
      <h1 className="flex cursor-pointer" onClick={() => navigate('')}>
        <span>
          <AlarmIcon className={`w-7 ${theme.fill.logo}`} />
        </span>
        <span className={`text-lg md:text-xl ${theme.text.logo} font-bold ml-2`}>TW Timer</span>
      </h1>
      {/* Buttons */}
      <div className="flex gap-3 items-center">
        <Settings />
        <RemoteConnection />
        <MenuButton icon={<HelpIcon />} onClick={() => navigate('/help')}>
          Help
        </MenuButton>
      </div>
    </header>
  );
}
