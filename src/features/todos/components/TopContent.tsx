import { AddTasks } from './AddTasks';
import { Alarm } from '../../alarm';

export const TopContent = () => {
  return (
    <>
      <div className="bg-yellow-700 rounded-md p-2 md:py-3 md:px-5 lg:w-4/6 mx-auto">
        <div className="flex justify-between text-white text-md font-bold">
          <span>Tasks: 1000</span>
          <Alarm />
        </div>
      </div>
      <AddTasks />
    </>
  );
};
