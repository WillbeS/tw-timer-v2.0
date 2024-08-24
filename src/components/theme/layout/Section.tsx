interface SectionProps {
  children: React.ReactNode;
}

export const Section = ({ children }: SectionProps) => {
  return <section className="max-w-sm mx-auto">{children}</section>;
};
