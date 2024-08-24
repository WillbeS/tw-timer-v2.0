import { useAppDispatch } from '../../../store/hooks';
import { updateColorThemeSettings } from '../store/settingsSlice';

import { AlarmOffsetForm } from './AlarmOffsetForm';
import { AlarmSoundForm } from './AlarmSoundForm';
import { ColorThemePicker } from '../../themes';
import { SettingsIcon } from '../../../components/utils/icons/SettingsIcon';
import { MenuButton, BaseModal } from '../../../components/theme';
import { Heading2, HR } from '../../../components/theme/layout';

export const Settings = () => {
  const dispatch = useAppDispatch();

  const OpenBtn = () => <MenuButton icon={<SettingsIcon />}>Settings</MenuButton>;

  return (
    <BaseModal heading="Settings" openBtn={<OpenBtn />}>
      <div className="max-w-sm mx-auto">
        <Heading2>Alarm Offset Defaults</Heading2>
        <AlarmOffsetForm />
        <HR />

        <Heading2>Alarm Sound</Heading2>
        <AlarmSoundForm />
        <HR />

        <Heading2>Color Themes</Heading2>
        <ColorThemePicker
          onChangeTheme={(newSettings) => dispatch(updateColorThemeSettings(newSettings))}
        />
      </div>
    </BaseModal>
  );
};
