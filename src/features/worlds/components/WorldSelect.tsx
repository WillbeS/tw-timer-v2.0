import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectWorld, worldSelector } from '../store/worldSlice';
import { UNSELECTED_WORLD } from '../data/constants';
import { TopBarSelect } from '../../../components/theme/layout';

export const WorldSelect = () => {
  const { worlds, selectedWorld } = useAppSelector(worldSelector);
  const dispatch = useAppDispatch();

  const worldOptions = worlds.map((w) => {
    return { value: w.tag, label: w.name };
  });
  worldOptions.unshift({ value: UNSELECTED_WORLD, label: 'All Worlds' });

  return (
    <TopBarSelect value={selectedWorld} onChange={(e) => dispatch(selectWorld(e.target.value))}>
      <option value={UNSELECTED_WORLD}>All Worlds</option>
      {worlds.map((w) => {
        return (
          <option key={w.tag} value={w.tag}>
            {w.name}
          </option>
        );
      })}
    </TopBarSelect>
  );
};
