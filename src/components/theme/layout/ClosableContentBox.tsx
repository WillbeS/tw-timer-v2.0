import { themeSelector } from '../../../features/themes/store/themeSlice';
import { useAppSelector } from '../../../store/hooks';
import { ContentBox } from '../../utils/ContentBox';

interface ClosableBoxProps {
  heading?: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
export const ClosableContentBox = ({ heading, footer, onClose, children }: ClosableBoxProps) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <ContentBox
      heading={heading}
      bgColor={theme.bg.list}
      textColor={theme.text.list}
      headingTextColor={theme.text.list}
      closable
      onClose={onClose}
      footer={footer}
    >
      {children}
    </ContentBox>
  );
};
