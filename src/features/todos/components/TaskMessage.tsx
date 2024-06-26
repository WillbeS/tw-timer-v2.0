import { TodoView } from '../models/TodoView';
import { TaskData } from '../data/types';
// import { todoTypes } from '../data/constants';
// import { AttackMessage } from './AttackMessage';

type Props = {
  todoView: TodoView;
  onEdit: (editedTodo: TaskData) => void;
};

export const TaskMessage = ({ todoView, onEdit }: Props) => {
  // if (todoView.getType() === todoTypes.ATTACK) {
  //   return <AttackMessage todoView={todoView} />;
  // }

  const { message, urlParts } = todoView.getTrancatedMessage(window.innerWidth);

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
