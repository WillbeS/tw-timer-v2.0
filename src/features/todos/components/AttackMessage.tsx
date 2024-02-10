import { TodoView } from '../models/TodoView';

import ram from '../../../assets/img/units/ram.png';

type Props = {
  todoView: TodoView;
};

export const AttackMessage = ({ todoView }: Props) => {
  const fullMessage = todoView.getMessage(); // may not need this at all
  // will need details - attacking from an to villages

  const send = todoView.getUrl() ? (
    <a
      href={todoView.getUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="text-yellow-800  hover:text-red-600"
    >
      Send
    </a>
  ) : (
    'Send'
  );

  return (
    <>
      {/* {message} */}
      <span className="flex items-center">
        {send}
        <img className="mx-1" width={18} height={18} src={ram} alt="ram" />
        from blabla to blabla
      </span>
    </>
  );
};
