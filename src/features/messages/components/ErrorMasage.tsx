import { useSelector, useDispatch } from 'react-redux';

import { clearErrors, selectErrors } from '../store/messageSlice';
import { ToastMessage } from '../../../components/ui/ToastMessage';
import { MESSAGE_TYPES } from '../../../data/constants';

// The toast message will replace this one?
export const ErrorMessage = () => {
  const errors = useSelector(selectErrors);

  const dispatch = useDispatch();

  const errorMsg = errors.join('\n');

  return (
    <ToastMessage type={MESSAGE_TYPES.ERROR} onClose={() => dispatch(clearErrors())}>
      {errorMsg}
    </ToastMessage>
  );
};
