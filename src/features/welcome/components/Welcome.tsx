import { setAsVisited } from '../srvices/storage';
import { Help } from '../../help/components/Help';
import { ClosableContentBox, HR } from '../../../components/theme/layout';
import { InfoIcon } from '../../../components/utils/icons/InfoIcon';

export const Welcome = () => {
  const reloadPage = () => {
    console.log('needs to reload the home page');
    setAsVisited(); //need this, removed for testing!!!
  };

  return (
    <ClosableContentBox heading="TW Timer - Help" onClose={reloadPage}>
      <div className="flex gap-1 text-base italic font-semibold opacity-70">
        <InfoIcon />
        <span>
          You are seeing this content because this is your first visit. After closing this window
          you can open it again from the Help button in the main menu.
        </span>
      </div>
      <HR />
      <Help />
    </ClosableContentBox>
  );
};
