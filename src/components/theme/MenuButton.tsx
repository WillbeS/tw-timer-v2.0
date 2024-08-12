import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { IconButton } from '../utils/IconButton';

type Props = {
  icon: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const MenuButton = ({ icon, children, onClick }: Props) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <IconButton
      size="base"
      icon={icon}
      bgColor={theme.bgColors.primary}
      bgHoverColor={theme.hoverColors.primary}
      textColor={theme.textColors.primary}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
};
