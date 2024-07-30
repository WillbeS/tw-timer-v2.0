import { ReactComponent as DeleteIcon } from '../../../assets/img/delete2.svg';

import { TaskData } from '../data/types';
import { getTodoView } from '../models';

// import { CountdownTimer } from '../../alarm/components/CountdownTimer';

import { TaskMessage } from './TaskMessage';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deleteTask } from '../store/taskActions';
import { formatTime } from '../../../utils/dateTime';
import { themeSelector } from '../../themes/store/themeSlice';

type Props = {
  todo: TaskData;
  onDynamicUpdate: (editedTodo: TaskData) => void;
  onToggleCompleted: (task: TaskData) => void;
};

export const CompletedTask = ({ todo, onDynamicUpdate, onToggleCompleted }: Props) => {
  const { theme } = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  const todoView = getTodoView(todo);

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div
      className={`flex flex-row justify-between gap-2 items-center px-2 py-3 rounded-md ${theme.bgColors.lightBox} ${theme.textColors.lightBox}`}
    >
      <div className="flex gap-3 justify-start">
        <div
          onClick={() => onToggleCompleted(todo)}
          className={`w-6 h-6 rounded-xl cursor-pointer flex justify-center items-center bg-stone-100 text-green-600 text-2xl hover:text-md hover:text-white`}
        >
          <span>✔</span>
        </div>

        <span className="line-through">
          <TaskMessage todoView={todoView} onEdit={onDynamicUpdate} />
        </span>
      </div>
      <div className="flex gap-2 md:gap-6 justify-end items-center pr-0 md:pr-3">
        <span>
          {/* <CountdownTimer todoView={todoView} /> */}
          <div className={`font-mono`}>{formatTime(todo.dueMs - new Date().getTime(), true)}</div>
        </span>
        <span
          role="button"
          className="px-1 cursor-pointer px-2 flex items-center"
          onClick={(e) => handleDelete(todo.id)}
        >
          <DeleteIcon className="w-5 h-5 fill-neutral-500 hover:fill-neutral-600" />
        </span>
      </div>
    </div>
  );
};
