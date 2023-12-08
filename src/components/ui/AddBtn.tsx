type Props = {
  bgColor?: string;
  labelColor?: string;
  onClick?: () => void;
};

export const AddBtn = ({ bgColor, labelColor, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <span
      onClick={handleClick}
      className={`inline-flex justify-center items-center border-none rounded-full w-14 h-14 cursor-pointer text-4xl drop-shadow-md hover:drop-shadow-lg ${
        bgColor ? bgColor : 'bg-green-600'
      } ${labelColor ? labelColor : 'text-stone-50'}`}
    >
      +
    </span>
  );
};
