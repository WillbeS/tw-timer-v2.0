import { MessageTypes } from '../../data/types';
import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { Alert } from '../utils/Alert';

interface AppAlertProps {
  type?: MessageTypes.Success | MessageTypes.Info | MessageTypes.Warning | MessageTypes.Error;
  onClose?: () => void;
  duration?: number;
  children?: React.ReactNode;
}
export const AppAlert = ({
  type = MessageTypes.Error,
  onClose,
  duration,
  children,
}: AppAlertProps) => {
  const { theme } = useAppSelector(themeSelector);

  //todo - make these theme colors
  const bgColor = {
    [MessageTypes.Success]: theme.bg.msgSuccess,
    [MessageTypes.Info]: theme.bg.msgInfo,
    [MessageTypes.Warning]: theme.bg.msgWarning,
    [MessageTypes.Error]: theme.bg.msgError,
  };

  const textColor = {
    [MessageTypes.Success]: theme.text.msgSuccess,
    [MessageTypes.Info]: theme.text.msgInfo,
    [MessageTypes.Warning]: theme.text.msgWarning,
    [MessageTypes.Error]: theme.text.msgError,
  };

  return (
    <Alert
      bgColor={bgColor[type]}
      textColor={textColor[type]}
      onClose={onClose}
      duration={duration}
    >
      {children}
    </Alert>
  );
};
