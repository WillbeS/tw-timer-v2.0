type Props = {
  isCompleted: boolean;
  onToggleCompleted: () => void;
};

export const CompletedCheckbox = ({ isCompleted, onToggleCompleted }: Props) => {
  const notCompletedStyles =
    'bg-stone-300 hover:bg-stone-400 text-white text-md hover:text-2xl hover:text-slate-600';

  const completedStyles = 'bg-stone-300 text-slate-600 text-2xl hover:text-md hover:text-white';

  return (
    <div
      onClick={onToggleCompleted}
      className={`w-6 h-6 rounded-xl cursor-pointer flex justify-center items-center ${
        isCompleted ? completedStyles : notCompletedStyles
      }`}
    >
      <span>✔</span>
    </div>
  );
};
