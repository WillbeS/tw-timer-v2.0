//will extract this later into a reusable component
interface ScreenThumbProps {
  title: string;
  imageName: string;
  frameBgColor?: string;
  frameTextColor?: string;
}

export const ScreenThumb = ({
  title,
  imageName,
  frameBgColor = 'bg-black',
  frameTextColor = 'text-white',
}: ScreenThumbProps) => {
  return (
    <div className={`w-[110px] bg-gray-300 rounded-md cursor-pointer`}>
      <div className="h-14 ">
        <img className="rounded-md" src={`img/thumbs/${imageName}`} alt="thumb for adding attack" />
      </div>
      <div
        className={`rounded-b-md text-xs md:text-sm font-semibold text-center py-1 ${frameBgColor} ${frameTextColor}`}
      >
        {title}
      </div>
    </div>
  );
};
