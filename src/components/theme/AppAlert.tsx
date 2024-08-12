import { MessageTypes } from '../../data/types';
import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';
import { Alert, AlertProps } from '../utils/Alert';

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
    [MessageTypes.Success]: theme.bgColors.success,
    [MessageTypes.Info]: theme.bgColors.info,
    [MessageTypes.Warning]: theme.bgColors.warning,
    [MessageTypes.Error]: theme.bgColors.danger,
  };

  const textColor = {
    [MessageTypes.Success]: theme.textColors.success,
    [MessageTypes.Info]: theme.textColors.info,
    [MessageTypes.Warning]: theme.textColors.warning,
    [MessageTypes.Error]: theme.textColors.danger,
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
