import { themeSelector } from '../../../features/themes/store/themeSlice';
import { useAppSelector } from '../../../store/hooks';
import { DropdownMenu } from '../../utils/DropdownMenu';
import { VerticalDotsIcon } from '../../utils/icons/VerticalDotsIcon';
import { PrimaryButton } from '../PrimaryButton';

interface TopBarOptionsProps {
  children?: React.ReactNode;
}

export const TopBarOptions = ({ children }: TopBarOptionsProps) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <DropdownMenu
      toggleBtn={
        <PrimaryButton>
          <VerticalDotsIcon />
        </PrimaryButton>
      }
      menuBgColor={theme.bg.list}
      menuTextColor={theme.text.list}
    >
      {children}
    </DropdownMenu>
  );
};
