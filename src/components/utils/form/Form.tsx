interface FormProps {
  children: React.ReactNode;
  onSubmit?: () => void;
  submitOnEnter?: boolean;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    console.log('inside the form');
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={`max-w-sm mx-auto`} noValidate>
      {children}
    </form>
  );
};
