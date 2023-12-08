import { SwitchBtn2 } from '../../components/ui/SwitchBtn2';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete2.svg';
import { ReactComponent as DetailsIcon } from '../../assets/img/ellipsis-vertical.svg';

import { Header } from './Header';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { TodosRow } from './TodosRow';
import { TopContent } from './TopContent';

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'attack', label: 'Attack' },
  { value: 'support', label: 'Support' },
];
const worldOptions = [
  { value: 'all', label: 'All Worlds' },
  { value: 'en131', label: '131' },
];

export const TodosDesign = () => {
  return (
    <div className="bg-amber-800 min-h-screen px-3 lg:px-6">
      <div className="md:w-10/12 lg:w-7/12 mx-auto">
        <Header />
        <main className="py-3 px-2 md:p-5 text-stone-700 pb-16">
          {/* Outlet */}
          <TopContent />
          <div className="mt-6 py-3 border-b border-orange-200 flex justify-end md:justify-between">
            <div className="hidden md:block text-white text-md md:text-lg font-semibold ">
              Tasks
            </div>
            {/* Top bar */}
            <div className="flex gap-2">
              <CustomSelect
                defaultOption={{ value: 'all', label: 'All Types' }}
                options={typeOptions}
                onSelect={(val: string) => console.log(val)}
              />
              <CustomSelect options={worldOptions} onSelect={(val: string) => console.log(val)} />
            </div>
            {/* End of Top bar */}
          </div>
          <div className="flex flex-col gap-2 text-base font-semibold mt-5">
            <TodosRow />
            <TodosRow />
            <TodosRow />
          </div>
          {/* End of Outlet */}
        </main>
        {/* Footer */}
      </div>
    </div>
  );
};
