import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateColorThemeSettings } from '../store/settingsSlice';
import { AlarmOffsetForm } from './AlarmOffsetForm';
import { AlarmSoundForm } from './AlarmSoundForm';
import { ColorThemePicker } from '../../themes';
import { themeSelector } from '../../themes/store/themeSlice';
import { MenuButton } from '../../../components/theme/MenuButton';
import { SettingsIcon } from '../../../components/utils/icons/SettingsIcon';
import { BaseModal } from '../../../components/theme/BaseModal';
import { Heading2 } from '../../../components/utils/Heading2';
import { Heading3 } from '../../../components/utils/Heading3';

export const Settings = () => {
  const { theme } = useAppSelector(themeSelector);

  const dispatch = useAppDispatch();

  const inputStyles =
    'rounded-md border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40';

  const OpenBtn = () => <MenuButton icon={<SettingsIcon />}>Settings</MenuButton>;

  return (
    <BaseModal heading="Settings" openBtn={<OpenBtn />}>
      <Heading2 uppercase>Alarm</Heading2>
      <Heading3>Default Offset (play sound N seconds early)</Heading3>

      <AlarmOffsetForm inputStyles={inputStyles} />
      <hr />
      <Heading3>Sound</Heading3>
      <AlarmSoundForm />
      <hr />
      <Heading2 uppercase>Theme</Heading2>
      <Heading3>Color Themes</Heading3>
      <ColorThemePicker
        onChangeTheme={(newSettings) => dispatch(updateColorThemeSettings(newSettings))}
      />
    </BaseModal>
  );
};
