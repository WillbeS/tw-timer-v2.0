import { ReactComponent as AlarmIcon } from '../../assets/img/alarm-clock.svg';

import { RoundedButton } from '../../components/ui/RoundedButton';

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 border-b border-yellow-900">
      <h1 className="flex cursor-pointer">
        <span>
          <AlarmIcon className="w-7" />
        </span>
        <span className="text-lg md:text-xl text-white font-bold ml-2">TW Timer</span>
      </h1>
      {/* Buttons */}
      <div className="flex gap-3">
        <RoundedButton label="Settings" symbol="⚙" onClick={() => console.log('Settings button')} />
        <RoundedButton label="Help" symbol="?" onClick={() => console.log('Settings button')} />
      </div>
    </header>
  );
};
