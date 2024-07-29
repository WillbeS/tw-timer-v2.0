import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { RoundedButton } from '../../../components/ui/RoundedButton';
import { theme } from '../../../themes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { settingsSelector, updateSettings } from '../store/settingsSlice';
import { SyntheticEvent, useState } from 'react';
import { AlarmOffsetForm } from './AlarmOffsetForm';
import { addSuccess } from '../../messages/store/messageSlice';
import { AlarmSoundForm } from './AlarmSoundForm';
import { ColorThemePicker } from '../../themes';

export const Settings = () => {
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();
  const { alarmOffset, alarmSoundFile, colorTheme } = useAppSelector(settingsSelector);
  //console.log(settings);

  const [alarmOffsetSettings, setAlarmOffsetSettings] = useState({ ...alarmOffset });
  const [alarmSoundSettings, setAlarmSoundSettings] = useState(alarmSoundFile);
  const [colorThemeSettings, setColorThemeSettings] = useState(colorTheme);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newSettings = {
      alarmOffset: alarmOffsetSettings,
      alarmSoundFile: alarmSoundSettings,
      colorTheme: colorThemeSettings,
    };

    dispatch(updateSettings(newSettings));
    dispatch(addSuccess('Your new settings were successfully saved.'));
    onCloseModal();
  };

  const heading2Styles = `text-lg font-bold uppercase py-3 mt-5 border-t ${theme.borderColors.button}`;
  const heading3Styles = `py-2 text-md font-semibold border-t ${theme.borderColors.feature}`;
  const inputStyles =
    'rounded-md border border-stone-200 focus:outline-none px-4 py-1 text-sm md:text-base bg-white bg-opacity-40';

  const OpenBtn = () => <RoundedButton label="Settings" symbol="⚙" onClick={onOpenModal} />;

  return (
    <ModalWrapper2
      heading="Settings"
      isOpen={modalOpened}
      onOpen={onOpenModal}
      onClose={onCloseModal}
      openBtn={<OpenBtn />}
    >
      <div className="p-4">
        <form className="w-full md:w-3/4 mx-auto" onSubmit={handleSubmit}>
          <h2 className={heading2Styles}>Alarm</h2>
          <h3 className={heading3Styles}>Default Offset (play sound N seconds early)</h3>
          <AlarmOffsetForm
            inputStyles={inputStyles}
            alarmOffsetSettings={alarmOffsetSettings}
            onChangeSettings={(newSettings) => setAlarmOffsetSettings(newSettings)}
          />

          <h3 className={heading3Styles}>Sound</h3>
          <AlarmSoundForm
            alarmSoundSettings={alarmSoundSettings}
            onChangeSettings={(newSettings) => setAlarmSoundSettings(newSettings)}
          />

          <h2 className={heading2Styles}>Theme</h2>
          <h3 className={heading3Styles}>Color Themes</h3>
          <ColorThemePicker
            colorThemeSettings={colorThemeSettings}
            onChangeTheme={(newSettings) => setColorThemeSettings(newSettings)}
          />

          <div
            className={`flex flex-row justify-end gap-2 py-4 mt-4 border-t ${theme.borderColors.feature}`}
          >
            <button
              type="submit"
              className="h-8 p-1 px-3 font-semibold bg-yellow-800 text-stone-100 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper2>
  );
};
