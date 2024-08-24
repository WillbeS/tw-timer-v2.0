import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../utils/Button';

type Props = {
  size?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const CancelButton = ({ size = 'base', children, onClick }: Props) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <Button
      size={size}
      bgColor="bg-transparent"
      bgHoverColor="hover:bg-black/20"
      textColor={theme.text.modal}
      borderColor="border-black/20"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
