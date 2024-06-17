import { useSelector, useDispatch } from 'react-redux';

import { clearInfo, selectInfoMessages } from '../store/messageSlice';
import { ToastMessage } from '../../../components/ui/ToastMessage';
import { MESSAGE_TYPES } from '../../../data/constants';

export const InfoMessage = () => {
  const messages = useSelector(selectInfoMessages);

  const dispatch = useDispatch();

  const errorMsg = messages.join('\n');

  return (
    <ToastMessage type={MESSAGE_TYPES.ERROR} onClose={() => dispatch(clearInfo())}>
      {errorMsg}
    </ToastMessage>
  );
};
