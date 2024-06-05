import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectFiltered } from '../../todos/store/todoSlice';
import { TaskData } from '../../todos/data/types';
import { todoTypes } from '../../todos/data/constants';

import { editTodo } from '../../todos/services/todoStorage';
import {
  editTodoAction,
  startLoadingAction,
  stoptLoadingAction,
} from '../../todos/store/todoSlice';
import { getTodoView } from '../../todos/models';

import alarmSound from '../services/AlarmSound';
import { SwitchBtn2 } from '../../../components/ui/SwitchBtn2';

// TODO - refactor this at all cost!!!
export const Alarm = () => {
  const dispatch = useDispatch();
  const todos: TaskData[] = useSelector(selectFiltered);
  const timer: Worker = useMemo(
    () => new Worker(new URL('../workers/alarmTimer.ts', import.meta.url)),
    [],
  );

  useEffect(() => {
    // For testing the ErrorBoundery component
    // Throws an error when there are no todos
    //console.log(todos[0].message);
    //////////////////////////////////////////
    if (window.Worker) {
      timer.postMessage([...todos]);
    }
  }, [timer, todos]);

  useEffect(() => {
    if (window.Worker) {
      timer.onmessage = (e: MessageEvent<TaskData>) => {
        alarmSound.play();

        const todo = e.data;

        if (todo && todo.type === todoTypes.MINTING) {
          const todoView = getTodoView(todo);
          const edited = todoView.update();

          if (edited) {
            dispatch(startLoadingAction());

            if (editTodo(edited)) {
              dispatch(editTodoAction(edited));
              dispatch(stoptLoadingAction());
            }
          }
        }
      };
    }
  }, [timer, dispatch]);

  const handleToggle = () => {
    alarmSound.toggleAlarm();
  };

  // console.log('Alarm is rendering');

  return (
    <span className="inline-flex items-center ml-auto">
      <span className="text-md font-bold mr-2">Alarm</span>
      <SwitchBtn2 onToggle={handleToggle} />
    </span>
  );
};
