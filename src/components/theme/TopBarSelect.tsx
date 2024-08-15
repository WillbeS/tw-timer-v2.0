import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { Select } from '../utils/form';

interface TopBarSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export const TopBarSelect = ({ value, onChange, children }: TopBarSelectProps) => {
  const { theme } = useAppSelector(themeSelector);
  return (
    <Select
      value={value}
      onChange={onChange}
      size="base"
      borderColor="border-none"
      bgColor={theme.bgColors.button}
      bgHoverColor={theme.hoverColors.primary}
      textColor={theme.textColors.button}
      cursorPointer
    >
      {children}
    </Select>
  );
};
