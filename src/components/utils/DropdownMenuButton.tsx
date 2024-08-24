type Props = {
  label: string;
  onClick?: () => void;
  symbol?: string;
  icon?: React.ReactNode;
};

export const DropdownMenuButton = ({ label, onClick, symbol, icon }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      className={`flex items-center gap-1 bg-black bg-opacity-0 hover:bg-opacity-10 py-1 px-3`}
    >
      {symbol && <span className="text-xl font-bold">{symbol}</span>}
      {icon && <span className="py-1">{icon}</span>}
      <span className="text-sm px-2">{label}</span>
    </div>
  );
};
