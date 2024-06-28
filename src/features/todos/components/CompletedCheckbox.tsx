type Props = {
  isCompleted: boolean;
  onToggleCompleted: () => void;
};

export const CompletedCheckbox = ({ isCompleted, onToggleCompleted }: Props) => {
  return (
    <input
      type="checkbox"
      defaultChecked={isCompleted}
      className="w-5 h-5 rounded-xl cursor-pointer"
      onChange={(e) => onToggleCompleted()}
    />
  );
};
