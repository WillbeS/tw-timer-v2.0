import { Select } from '../../../components/form/Select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectWorld, worldSelector } from '../store/worldSlice';

export const WorldSelect = () => {
  const { worlds, selectedWorld } = useAppSelector(worldSelector);
  const dispatch = useAppDispatch();

  const worldOptions = worlds.map((w) => {
    return { value: w.tag, label: w.name };
  });
  worldOptions.unshift({ value: '0', label: 'All Worlds' });

  return (
    <Select
      options={worldOptions}
      defaultValue={selectedWorld}
      fullWidth
      onChange={(selected) => dispatch(selectWorld(selected))}
    />
  );
};
