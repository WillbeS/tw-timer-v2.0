import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const { theme } = useAppSelector(themeSelector);
  return (
    <div
      className={`relative min-h-screen px-3 lg:px-6 ${theme.bgColors.main} ${theme.textColors.main}`}
    >
      {children}
    </div>
  );
};
