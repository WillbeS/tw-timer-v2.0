import { useEffect } from 'react';

import { RootState } from '../../../store/store';
import { dynamicUpdateAction, filteredTasksSelector, todosSelector } from '../store/todoSlice';
import { toggleCompleted } from '../store/taskActions';
import { useAppDispatch } from '../../../store/hooks';
import { useAppSelector } from '../../../store/hooks';
import { formatTime } from '../../../utils/dateTime';

import { TaskData } from '../data/types';

import { CompletedTask } from './CompletedTask';
import { TopBar } from './TopBar';
import { Task } from './Task';
import { AppSpinner } from '../../../components/theme';

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const { loading, showCompleted } = useAppSelector(todosSelector);

  const todos = useAppSelector((state: RootState) => filteredTasksSelector(state));

  const nextDeadline = todos.length > 0 ? todos[0].dueMs : null;
  const nextTodoType = todos.length > 0 ? todos[0].type : null;

  useEffect(() => {
    if (nextDeadline) {
      const interval = setInterval(() => {
        document.title = `${formatTime(nextDeadline - new Date().getTime())} - ${nextTodoType}`;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextDeadline, nextTodoType]);

  const onToggleCompleted = (task: TaskData) => {
    const forEdit: TaskData = { ...task, completed: !task.completed };
    dispatch(toggleCompleted(forEdit));
  };

  //console.log('Todo list is rendering');
  return (
    <>
      <TopBar />

      <div className="flex flex-col gap-2 text-sm md:text-lg font-semibold mt-5">
        {loading && (
          <div className="flex justify-center mb-3">
            <AppSpinner />
          </div>
        )}
        {Object.values(todos).map((todo) => {
          if (showCompleted) {
            return (
              <CompletedTask
                key={todo.id}
                todo={todo}
                onDynamicUpdate={(updated) => dispatch(dynamicUpdateAction(updated))}
                onToggleCompleted={onToggleCompleted}
              />
            );
          }

          return (
            <Task
              key={todo.id}
              todo={todo}
              onDynamicUpdate={(updated) => dispatch(dynamicUpdateAction(updated))}
              onToggleCompleted={onToggleCompleted}
            />
          );
        })}
      </div>
    </>
  );
};
