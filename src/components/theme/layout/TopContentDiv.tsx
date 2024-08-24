import { themeSelector } from '../../../features/themes/store/themeSlice';
import { useAppSelector } from '../../../store/hooks';

interface TopContentDivProps {
  children: React.ReactNode;
}

export const TopContentDiv = ({ children }: TopContentDivProps) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <div
      className={`${theme.bg.featureContent} ${theme.text.featureContent} rounded-md p-2 md:py-3 md:px-5 lg:w-4/6 mx-auto`}
    >
      {children}
    </div>
  );
};
