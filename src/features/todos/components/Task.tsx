import { useAppDispatch } from '../../../store/hooks';
import { deleteTask } from '../store/taskActions';

import { TaskData } from '../data/types';
import { getTodoView } from '../models';

import { CountdownTimer } from '../../alarm/components/CountdownTimer';
import { TaskDetails } from './TaskDetails';
import { TaskMessage } from './TaskMessage';
import { ListItem } from '../../../components/theme';
import { CheckboxButton } from '../../../components/utils/CheckboxButton';

interface TaskProps {
  todo: TaskData;
  onDynamicUpdate: (editedTodo: TaskData) => void;
  onToggleCompleted: (task: TaskData) => void;
}

export const Task = ({ todo, onDynamicUpdate, onToggleCompleted }: TaskProps) => {
  const dispatch = useAppDispatch();

  const todoView = getTodoView(todo);

  const handleDynamicUpdate = () => {
    const edited = todoView.update();

    if (edited) {
      onDynamicUpdate(edited);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <ListItem>
      <div className="flex gap-1 justify-start">
        <span
          role="button"
          className="px-1 cursor-pointer md:px-2 flex items-center"
          onClick={(e) => console.log('Todo details')}
        >
          <TaskDetails taskView={todoView} onDelete={handleDelete} />
        </span>
        <span>
          <TaskMessage todoView={todoView} onEdit={onDynamicUpdate} />
          {todoView.canUpdate() && (
            <span
              className="pl-3 pr-2 cursor-pointer text-lg font-bold"
              onClick={handleDynamicUpdate}
            >
              ⟳
            </span>
          )}
        </span>
      </div>
      <div className="flex gap-2 md:gap-6 justify-end items-center pr-0 md:pr-3">
        <span>
          <CountdownTimer todoView={todoView} />
        </span>
        <CheckboxButton onToggleChecked={() => onToggleCompleted(todo)} />
      </div>
    </ListItem>
  );
};
