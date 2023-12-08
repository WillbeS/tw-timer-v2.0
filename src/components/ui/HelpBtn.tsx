import { ReactComponent as HelpIcon } from '../../assets/img/help.svg';

type Props = {
  onClick?: () => void;
};

export const HelpBtn = ({ onClick }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <span role="button" aria-label="Help button" onClick={handleClick} className={`border-none`}>
      <HelpIcon className="w-5 h-5 cursor-pointer" />
    </span>
  );
};
