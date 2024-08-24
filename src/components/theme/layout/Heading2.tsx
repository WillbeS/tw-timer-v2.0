interface Heading2Props {
  children: React.ReactNode;
  textColor?: string;
  uppercase?: boolean;
}

export const Heading2 = ({ children, textColor = '', uppercase = false }: Heading2Props) => {
  return (
    <h2 className={`text-xl font-semibold ${uppercase && 'uppercase'} mb-3 ${textColor}`}>
      {children}
    </h2>
  );
};
