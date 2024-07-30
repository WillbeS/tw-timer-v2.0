import { useAppDispatch } from '../../../store/hooks';
import { allThemes } from '../data/constants';
import { selectTheme } from '../store/themeSlice';
import { ColorThemeBtn } from './ColorThemeBtn';

type Props = {
  onChangeTheme: (newThemeName: string) => void;
};

export const ColorThemePicker = ({ onChangeTheme }: Props) => {
  const dispatch = useAppDispatch();

  const selectNewTheme = (newTheme: string) => {
    dispatch(selectTheme(newTheme));
    onChangeTheme(newTheme);
  };

  return (
    <div className="flex justify-end gap-3">
      {Object.keys(allThemes).map((key) => {
        return (
          <ColorThemeBtn
            key={key}
            name={key}
            theme={allThemes[key]}
            onClick={(newTheme) => selectNewTheme(newTheme)}
          />
        );
      })}
    </div>
  );
};
