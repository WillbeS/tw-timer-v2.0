interface ModalButtonProps {
  openBtn: React.ReactNode;
  handleOpen: (e: React.MouseEvent<HTMLElement>) => void;
}

export const ModalOpenButton = ({ openBtn, handleOpen }: ModalButtonProps) => {
  if (!openBtn) {
    return (
      <span aria-label="Open" area-role="button" onClick={handleOpen}>
        <span className="inline-block rounded-md border py-1 px-3 shadow-sm cursor-pointer">
          Open
        </span>
      </span>
    );
  }

  return (
    <span aria-label="Open" area-role="button" onClick={handleOpen}>
      {openBtn}
    </span>
  );
};
