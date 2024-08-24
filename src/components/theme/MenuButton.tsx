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
      bgColor={theme.bg.header}
      bgHoverColor={theme.hoverBg.header}
      textColor={theme.text.header}
      textHoverColor={theme.hoverText.header}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
};
