import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { ToggleSwitch } from '../utils/ToggleSwitch';

interface FeatureToggleSwitchProps {
  label: string;
  onToggle: () => void;
}

export const FeatureToggleSwitch = ({ label, onToggle }: FeatureToggleSwitchProps) => {
  const { theme } = useAppSelector(themeSelector);

  return <ToggleSwitch label={label} onToggle={onToggle} labelColor={theme.text.featureContent} />;
};
