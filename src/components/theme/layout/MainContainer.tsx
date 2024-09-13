import { themeSelector } from '../../../features/themes/store/themeSlice';
import { useAppSelector } from '../../../store/hooks';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const { theme } = useAppSelector(themeSelector);
  return (
    <div
      className={`flex flex-col justify-between min-h-screen px-3 lg:px-6 ${theme.bg.main} ${theme.text.main}`}
    >
      {children}
    </div>
  );
};
