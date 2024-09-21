import { useNavigate } from 'react-router-dom';
import { ClosableContentBox, TopBarDiv } from '../../../components/theme/layout';
import { HelpContent } from './HelpContent';

export const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 mt-5">
      {/* <TopBarDiv>
        <div className="text-md md:text-lg font-semibold ">Help</div>
      </TopBarDiv> */}
      <ClosableContentBox heading="TW Timer - Help" onClose={() => navigate('/')}>
        <HelpContent />
      </ClosableContentBox>
    </div>
  );
};
