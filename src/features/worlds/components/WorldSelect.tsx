import { Select } from '../../../components/form/Select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { theme } from '../../../themes';
import { UNSELECTED_WORLD } from '../data/constants';
import { selectWorld, worldSelector } from '../store/worldSlice';

export const WorldSelect = () => {
  const { worlds, selectedWorld } = useAppSelector(worldSelector);
  const dispatch = useAppDispatch();

  const worldOptions = worlds.map((w) => {
    return { value: w.tag, label: w.name };
  });
  worldOptions.unshift({ value: UNSELECTED_WORLD, label: 'All Worlds' });

  return (
    <Select
      options={worldOptions}
      defaultValue={selectedWorld}
      fullWidth
      onChange={(selected) => dispatch(selectWorld(selected))}
      borderColor={theme.borderColors.button}
      bgColor={theme.bgColors.button}
      textColor={theme.textColors.button}
    />
  );
};
