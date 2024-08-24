import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';

interface ListItemProps {
  children: React.ReactNode;
}
export const ListItem = ({ children }: ListItemProps) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <div
      className={`flex flex-row justify-between gap-2 items-center px-2 py-3 rounded-md ${theme.bg.list} ${theme.text.list}`}
    >
      {children}
    </div>
  );
};
