import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { Spinner } from '../utils/Spinner';

export const AppSpinner = () => {
  const { theme } = useAppSelector(themeSelector);

  return <Spinner fillColor={theme.fill.main} textColor={theme.text.main} />;
};
