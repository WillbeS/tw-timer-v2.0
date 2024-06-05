import { useSelector, useDispatch } from 'react-redux';

import { Alert } from '../../../components/ui/Alert';
import { clearErrors, selectErrors } from '../store/messageSlice';

// TODO - get the messages
// if there are any, display them (need to decide at once or one by one)
// on close, delete them from the state

export const ErrorMessage = () => {
  const errors = useSelector(selectErrors);
  const hasErrors = errors.length > 0;

  const dispatch = useDispatch();

  if (!hasErrors) return null;

  return (
    <Alert heading="Error" type="warning" closable onClose={() => dispatch(clearErrors)}>
      An error occured
    </Alert>
  );
};
