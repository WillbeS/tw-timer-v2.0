interface CheckboxButtonProps {
  onToggleChecked: (obj: unknown) => void;
  checked?: boolean;
  checkedBgColor?: string;
  uncheckedBgColor?: string;
}

export const CheckboxButton = ({
  checked = false,
  checkedBgColor = 'bg-black/10',
  uncheckedBgColor = 'bg-black/20',
  onToggleChecked,
}: CheckboxButtonProps) => {
  const checkedStyles = `${checkedBgColor} text-green-600 text-2xl hover:text-md hover:text-white/70`;
  const uncheckedStyles = `${uncheckedBgColor} text-white/70 text-md hover:text-2xl hover:text-green-600`;

  return (
    <div
      onClick={onToggleChecked}
      className={`w-6 h-6 rounded-xl cursor-pointer flex justify-center items-center ${
        checked ? checkedStyles : uncheckedStyles
      }`}
    >
      <span>✔</span>
    </div>
  );
};
