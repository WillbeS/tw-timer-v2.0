import { Help } from '../features/help/components/Help';
import { theme } from '../themes';

export const HelpPage = () => {
  return (
    <div
      className={`flex flex-col gap-2 text-sm md:text-lg font-semibold p-5 rounded-md mt-9 ${theme.bgColors.lightBox} ${theme.textColors.lightBox}`}
    >
      <Help />
    </div>
  );
};
