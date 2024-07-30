import { ModalWrapper2 } from '../../../components/ui/ModalWrapper2';
import { useModalWrapper } from '../../../hooks/useModalWrapper';
import { RoundedButton } from '../../../components/ui/RoundedButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateColorThemeSettings } from '../store/settingsSlice';
import { AlarmOffsetForm } from './AlarmOffsetForm';
import { AlarmSoundForm } from './AlarmSoundForm';
import { ColorThemePicker } from '../../themes';
import { themeSelector } from '../../themes/store/themeSlice';

export const Settings = () => {
  const { theme } = useAppSelector(themeSelector);
  const { modalOpened, onOpenModal, onCloseModal } = useModalWrapper();

  console.log('Render the settings component');

  const dispatch = useAppDispatch();

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
      <div className="p-4 w-full md:w-3/4 mx-auto">
        <h2 className={heading2Styles}>Alarm</h2>
        <h3 className={heading3Styles}>Default Offset (play sound N seconds early)</h3>
        <AlarmOffsetForm inputStyles={inputStyles} />

        <h3 className={heading3Styles}>Sound</h3>
        <AlarmSoundForm />

        <h2 className={heading2Styles}>Theme</h2>
        <h3 className={heading3Styles}>Color Themes</h3>
        <ColorThemePicker
          onChangeTheme={(newSettings) => dispatch(updateColorThemeSettings(newSettings))}
        />
      </div>
    </ModalWrapper2>
  );
};
