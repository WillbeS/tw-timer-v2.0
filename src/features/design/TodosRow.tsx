import { ReactComponent as DeleteIcon } from '../../assets/img/delete2.svg';

import { TodosDetails } from './TodosDetails';

export const TodosRow = () => {
  return (
    <div className="flex flex-row justify-between gap-2 items-center bg-orange-100 px-2 py-3 rounded-md">
      <div className="flex gap-1 justify-start">
        <span
          role="button"
          className="px-1 cursor-pointer px-2 flex items-center"
          onClick={(e) => console.log('Todo details')}
        >
          <TodosDetails />
        </span>
        <span>Test something very long in 15 minutes</span>
      </div>

      <div className="flex gap-3 md:gap-6 justify-end">
        <span>00:01:11</span>
        <span
          role="button"
          className="px-1 cursor-pointer px-2 flex items-center"
          onClick={(e) => console.log('Todo delete')}
        >
          <DeleteIcon className="w-5 h-5 fill-neutral-400 hover:fill-neutral-500" />
        </span>
      </div>
    </div>
  );
};
