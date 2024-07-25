import { ReactComponent as DeleteIcon } from '../../../assets/img/delete2.svg';

import { TaskData } from '../data/types';
import { getTodoView } from '../models';

import { CountdownTimer } from '../../alarm/components/CountdownTimer';
import { TaskDetails } from './TaskDetails';
import { TaskMessage } from './TaskMessage';

import { theme } from '../../../themes';
import { useAppDispatch } from '../../../store/hooks';
import { deleteTask } from '../store/taskActions';

type Props = {
  todo: TaskData;
  onDynamicUpdate: (editedTodo: TaskData) => void;
  onToggleCompleted: (task: TaskData) => void;
};

export const Task = ({ todo, onDynamicUpdate, onToggleCompleted }: Props) => {
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

  const notCompletedStyles = 'bg-stone-300 text-white text-md hover:text-2xl hover:text-green-600';

  const completedStyles = 'bg-stone-300 text-slate-600 text-2xl hover:text-md hover:text-white';

  return (
    <div
      className={`flex flex-row justify-between gap-2 items-center px-2 py-3 rounded-md ${theme.bgColors.lightBox} ${theme.textColors.lightBox}`}
    >
      <div className="flex gap-1 justify-start">
        <span
          role="button"
          className="px-1 cursor-pointer px-2 flex items-center"
          onClick={(e) => console.log('Todo details')}
        >
          <TaskDetails taskView={todoView} onDelete={handleDelete} />
        </span>
        <span>
          <TaskMessage todoView={todoView} onEdit={onDynamicUpdate} />
          {todoView.canUpdate() ? (
            <span
              className="pl-3 pr-2 cursor-pointer text-lg font-bold"
              onClick={handleDynamicUpdate}
            >
              ⟳
            </span>
          ) : null}
          {todoView.getId()}
        </span>
      </div>
      <div className="flex gap-2 md:gap-6 justify-end items-center pr-0 md:pr-3">
        <span>
          <CountdownTimer todoView={todoView} />
        </span>
        {/* <span
          role="button"
          className="px-1 cursor-pointer px-2 flex items-center"
          onClick={(e) => onDelete(todo.id, todo.world)}
        >
          <DeleteIcon className="w-5 h-5 fill-neutral-500 hover:fill-neutral-600" />
        </span> */}
        {/* <CompletedCheckbox isCompleted={todo.completed} onToggleCompleted={onToggleCompleted} /> */}

        <div
          onClick={() => onToggleCompleted(todo)}
          className={`w-6 h-6 rounded-xl cursor-pointer flex justify-center items-center ${
            todo.completed ? completedStyles : notCompletedStyles
          }`}
        >
          <span>✔</span>
        </div>
      </div>
    </div>
  );
};
