import { Select } from '../../../components/form/Select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { theme } from '../../../themes';
import { todoTypes } from '../data/constants';
import { UNSELECTED_TYPE } from '../data/constants';
import { selectType, todosSelector } from '../store/todoSlice';

export const TypeSelect = () => {
  const dispatch = useAppDispatch();
  const { selectedType } = useAppSelector(todosSelector);

  const typeOptions = Object.values(todoTypes).map((value) => {
    return { value, label: value };
  });
  typeOptions.unshift({ value: UNSELECTED_TYPE, label: 'All Types' });

  return (
    <Select
      options={typeOptions}
      defaultValue={selectedType}
      fullWidth
      onChange={(selected) => dispatch(selectType(selected))}
      borderColor={theme.borderColors.button}
      bgColor={theme.bgColors.button}
      textColor={theme.textColors.button}
    />
  );
};
