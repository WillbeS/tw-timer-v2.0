import { TodoView } from '../models/TodoView';
import { Todo } from '../data/types';

type Props = {
  todoView: TodoView;
  onEdit: (editedTodo: Todo) => void;
};

export const TaskMessage = ({ todoView, onEdit }: Props) => {
  const { message, urlParts } = todoView.getMessage(window.innerWidth);

  if (!urlParts) return <>{message}</>;
  const { beforeTxt, linkTxt, afterTxt, url } = urlParts;

  const handleLinkClick = () => {
    const edited = todoView.update('url');

    if (edited) {
      onEdit(edited);
    }
  };

  return (
    <>
      {beforeTxt}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-800  hover:text-red-600"
        onClick={handleLinkClick}
      >
        {linkTxt}
        {/* <span className="font-bold pl-1 pr-2">⤴</span> */}
      </a>
      {afterTxt}
    </>
  );
};
