import { useAppSelector } from '../../../store/hooks';
import { themeSelector } from '../../../features/themes/store/themeSlice';

export function Footer() {
  const { theme } = useAppSelector(themeSelector);

  return (
    <footer className={`border-t ${theme.border.topBar}`}>
      <div className="w-full p-4 md:flex md:items-center md:justify-center">
        <span className="text-sm sm:text-center">
          © 2024{' '}
          <a href="https://twtimer.vvillbes.eu" className="hover:underline">
            TW Timer
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
