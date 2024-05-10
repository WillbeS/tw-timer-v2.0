type Props = {
  worldName: string;
  worldId: number;
  token: string;
};

export const ConnectedWorlds = ({ worldName, worldId, token }: Props) => {
  return (
    <div className="md:w-3/4 mx-auto flex gap-3 md:gap-5 text-sm md:text-base">
      <span className="font-bold">{worldName}</span>
      <span>{token}....</span>
      <span className="cursor-pointer underline text-red-700">Remove</span>
    </div>
  );
};
