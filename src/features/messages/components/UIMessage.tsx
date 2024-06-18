import { useDispatch, useSelector } from 'react-redux';

import { clearMessages } from '../store/messageSlice';
import { ToastMessage } from '../../../components/ui/ToastMessage';
import { RootState } from '../../../store/store';
import { MessageTypes } from '../../../data/types';

export const UIMessage = () => {
  const dispatch = useDispatch();
  const uiMessages = useSelector((state: RootState) => state.messages);

  let messageType: MessageTypes | undefined;
  let message: string | undefined;

  for (const messageKey in uiMessages) {
    const key = messageKey as MessageTypes;
    if (uiMessages[key].length > 0) {
      messageType = key;
      message = uiMessages[key].join('\n');
    }
  }

  if (!message || !messageType) return null;

  return (
    <ToastMessage
      type={messageType}
      onClose={() => dispatch(clearMessages(messageType as MessageTypes))}
    >
      {message}
    </ToastMessage>
  );
};
