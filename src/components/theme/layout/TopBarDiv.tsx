import { themeSelector } from '../../../features/themes/store/themeSlice';
import { useAppSelector } from '../../../store/hooks';

interface TopBarProps {
  children: React.ReactNode;
}

export const TopBarDiv = ({ children }: TopBarProps) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <div
      className={`py-3 border-b ${theme.border.topBar} flex justify-end md:justify-between items-center ${theme.text.main}`}
    >
      {children}
    </div>
  );
};
