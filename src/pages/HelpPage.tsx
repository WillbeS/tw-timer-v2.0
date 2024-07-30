import { Help } from '../features/help/components/Help';
import { themeSelector } from '../features/themes/store/themeSlice';
import { useAppSelector } from '../store/hooks';

export const HelpPage = () => {
  const { theme } = useAppSelector(themeSelector);
  return (
    <div
      className={`flex flex-col gap-2 text-sm md:text-lg font-semibold p-5 rounded-md mt-9 ${theme.bgColors.lightBox} ${theme.textColors.lightBox}`}
    >
      <Help />
    </div>
  );
};
