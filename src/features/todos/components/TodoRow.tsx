import { ReactComponent as DeleteIcon } from '../../../assets/img/delete2.svg';

import { Todo } from '../data/types';
import { getTodoView } from '../models';

//import { CountdownTimer } from '../../alarm/components/CountdownTimer';
import { CountdownTimer } from '../../alarm/components/CountdownTimer';
import { TodoDetails } from './TodoDetails';
import { TodoMessage } from './TodoMessage';
import { defaultTheme } from '../../../data/constants';

type Props = { todo: Todo; onDelete: (id: string) => void; onEdit: (editedTodo: Todo) => void };

export const TodoRow = ({ todo, onDelete, onEdit }: Props) => {
  const todoView = getTodoView(todo);

  const handleUpdate = () => {
    const edited = todoView.update();

    if (edited) {
      onEdit(edited);
    }
  };

  const iconSpanStyles = 'px-1 cursor-pointer';
  const iconStyles = `w-5 h-5 fill-neutral-500 hover:fill-neutral-700`;

  return (
    <div
      className={`flex flex-row justify-between gap-2 items-center px-2 py-3 rounded-md ${defaultTheme.taksBgColor}`}
    >
      <div className="flex gap-1 justify-start">
        <span
          role="button"
          className="px-1 cursor-pointer px-2 flex items-center"
          onClick={(e) => console.log('Todo details')}
        >
          <TodoDetails details={todoView.getDetails()} />
        </span>
        <span>
          <TodoMessage todoView={todoView} onEdit={onEdit} />

          {todoView.canUpdate() ? (
            <span className="pl-3 pr-2 cursor-pointer text-lg font-bold" onClick={handleUpdate}>
              ⟳
            </span>
          ) : null}
        </span>
      </div>
      <div className="flex gap-3 md:gap-6 justify-end">
        <span>
          {/* <CountdownTimer id={todo.id} /> */}
          <CountdownTimer todoView={todoView} />
        </span>
        <span
          role="button"
          className="px-1 cursor-pointer px-2 flex items-center"
          onClick={(e) => onDelete(todo.id)}
        >
          <DeleteIcon className="w-5 h-5 fill-neutral-500 hover:fill-neutral-600" />
        </span>
      </div>
    </div>
  );
};
