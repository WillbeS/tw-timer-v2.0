import { themeSelector } from '../../features/themes/store/themeSlice';
import { useAppSelector } from '../../store/hooks';

interface AddButtonProps {
  label?: string;
}

export const AddButton = ({ label = 'Add' }: AddButtonProps) => {
  const { theme } = useAppSelector(themeSelector);
  return (
    <div
      aria-label="Add"
      area-role="button"
      className={`flex justify-center items-center gap-2 rounded-md p-2 md:py-4 md:px-5 lg:w-4/6 mx-auto ${theme.bgColors.feature} border ${theme.borderColors.feature} border-dashed cursor-pointer mt-2 font-semibold ${theme.textColors.feature}`}
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      {label}
    </div>
  );
};
