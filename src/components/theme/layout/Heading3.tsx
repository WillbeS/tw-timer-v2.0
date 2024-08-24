interface Heading2Props {
  children: React.ReactNode;
  textColor?: string;
  uppercase?: boolean;
}

export const Heading3 = ({ children, textColor = '', uppercase = false }: Heading2Props) => {
  return (
    <h3 className={`text-lg font-semibold ${uppercase && 'uppercase'} mb-2 ${textColor}`}>
      {children}
    </h3>
  );
};
