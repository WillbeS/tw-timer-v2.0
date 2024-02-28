import { MintingTodoView } from '../models/MintingTodoView';

type Props = {
  viewData: MintingTodoView;
};

export const MintingDetails = ({ viewData }: Props) => {
  const groupedTransports = viewData.getGroupedTransports();
  console.log(groupedTransports);
  return (
    <div>
      <h3 className="font-bold text-center mt-3">Transports Details</h3>
      <div className="flex justify-center gap-2 my-1">
        <div>Grouped by: </div>
        <div>5 minutes</div>
      </div>
      {groupedTransports.map(({ date, wood, clay, iron }) => {
        return (
          <div className="flex justify-between">
            <span>{date}</span>
            <div className="flex justify-end gap-3">
              <span>{wood}</span>
              <span>{clay}</span>
              <span>{iron}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
