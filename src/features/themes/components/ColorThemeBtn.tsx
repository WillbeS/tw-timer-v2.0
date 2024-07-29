import { ColorTheme } from '../../../themes/ColorTheme';

type Props = {
  theme: ColorTheme;
  name: string;
  onClick: (themeName: string) => void;
};

export const ColorThemeBtn = ({ theme, name, onClick }: Props) => {
  return (
    <span
      onClick={() => onClick(name)}
      className={`cursor-pointer w-10 h-10 rounded-3xl ${theme.bgColors.main}`}
    ></span>
  );
};
