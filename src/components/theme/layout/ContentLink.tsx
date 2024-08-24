import { themeSelector } from '../../../features/themes/store/themeSlice';
import { useAppSelector } from '../../../store/hooks';

interface ContentLinkProps {
  url: string;
  onClick: () => void;
  target?: '_blank' | '_self' | '_parent' | '_top';
  children: React.ReactNode;
}

export const ContentLink = ({ url, onClick, target = '_blank', children }: ContentLinkProps) => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <a
      href={url}
      target={target}
      rel="noopener noreferrer"
      className={`${theme.text.contentLink} ${theme.hoverText.contentLink}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
