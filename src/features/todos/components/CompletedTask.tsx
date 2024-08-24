import { ReactComponent as DeleteIcon } from '../../../assets/img/delete2.svg';

import { TaskData } from '../data/types';
import { getTodoView } from '../models';

import { TaskMessage } from './TaskMessage';

import { useAppDispatch } from '../../../store/hooks';
import { deleteTask } from '../store/taskActions';
import { formatTime } from '../../../utils/dateTime';
import { ListItem } from '../../../components/theme';
import { CheckboxButton } from '../../../components/utils/CheckboxButton';

type Props = {
  todo: TaskData;
  onDynamicUpdate: (editedTodo: TaskData) => void;
  onToggleCompleted: (task: TaskData) => void;
};

export const CompletedTask = ({ todo, onDynamicUpdate, onToggleCompleted }: Props) => {
  const dispatch = useAppDispatch();

  const todoView = getTodoView(todo);

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <ListItem>
      <div className="flex gap-3 justify-start">
        <CheckboxButton checked onToggleChecked={() => onToggleCompleted(todo)} />

        <span className="line-through">
          <TaskMessage todoView={todoView} onEdit={onDynamicUpdate} />
        </span>
      </div>
      <div className="flex gap-2 md:gap-6 justify-end items-center pr-0 md:pr-3">
        <span>
          <div className={`font-mono`}>{formatTime(todo.dueMs - new Date().getTime(), true)}</div>
        </span>
        <span
          role="button"
          className="px-1 cursor-pointer md:px-2 flex items-center"
          onClick={(e) => handleDelete(todo.id)}
        >
          <DeleteIcon className="w-5 h-5 fill-neutral-500 hover:fill-neutral-600" />
        </span>
      </div>
    </ListItem>
  );
};
