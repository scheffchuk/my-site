export function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="text-accent flex flex-col">
      {title && <h2 className="text-medium font-medium mb-5">{title}</h2>}
      {children}
    </section>
  );
}

