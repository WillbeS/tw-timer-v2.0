import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../utils/Button';

type Props = {
  size?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const PrimaryButton = ({ type = 'button', size = 'base', children, onClick }: Props) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <Button
      type={type}
      size={size}
      bgColor={theme.bg.topBar}
      bgHoverColor={theme.hoverBg.topBar}
      textColor={theme.text.topBar}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
