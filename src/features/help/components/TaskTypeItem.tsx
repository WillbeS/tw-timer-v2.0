interface TaskTypeItemProps {
  typeName: string;
  explanation: string;
}

//may add link to a visual tutorial in the future
export const TaskTypeItem = ({ typeName, explanation }: TaskTypeItemProps) => {
  return (
    <li>
      <span className="font-semibold">{typeName}</span>
      {' - '}
      {explanation}
    </li>
  );
};
