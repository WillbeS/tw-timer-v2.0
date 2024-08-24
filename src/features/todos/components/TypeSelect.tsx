import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectType, todosSelector } from '../store/todoSlice';
import { TopBarSelect } from '../../../components/theme/layout';

import { todoTypes } from '../data/constants';
import { UNSELECTED_TYPE } from '../data/constants';

export const TypeSelect = () => {
  const dispatch = useAppDispatch();
  const { selectedType } = useAppSelector(todosSelector);

  const typeOptions = Object.values(todoTypes).map((value) => {
    return { value, label: value };
  });
  typeOptions.unshift({ value: UNSELECTED_TYPE, label: 'All Types' });

  return (
    <TopBarSelect value={selectedType} onChange={(e) => dispatch(selectType(e.target.value))}>
      <option value={UNSELECTED_TYPE}>All Types</option>
      {Object.values(todoTypes).map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </TopBarSelect>
  );
};
