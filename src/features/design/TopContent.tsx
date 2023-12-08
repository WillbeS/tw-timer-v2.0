import { SwitchBtn2 } from '../../components/ui/SwitchBtn2';
import { AddTasks } from './AddTasks';

export const TopContent = () => {
  return (
    <>
      <div className="bg-yellow-700 rounded-md p-2 md:py-3 md:px-5 lg:w-4/6 mx-auto">
        <div className="flex justify-between text-white text-md font-bold">
          <span>Tasks: 1000</span>
          {/* Alarm */}
          <span className="inline-flex items-center">
            <span className="mr-2">Alarm</span>
            <SwitchBtn2 />
          </span>
        </div>
      </div>
      <AddTasks />
    </>
  );
};
