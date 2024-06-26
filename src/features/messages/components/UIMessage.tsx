import { clearMessages } from '../store/messageSlice';
import { ToastMessage } from '../../../components/ui/ToastMessage';
import { RootState } from '../../../store/store';
import { MessageTypes } from '../../../data/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export const UIMessage = () => {
  const dispatch = useAppDispatch();
  const uiMessages = useAppSelector((state: RootState) => state.messages);

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
