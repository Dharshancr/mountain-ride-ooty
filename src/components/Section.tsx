export function SectionHeading({
  eyebrow,
  title,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block text-rust font-sans font-semibold text-xs tracking-[0.2em] uppercase mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-forest tracking-wide">{title}</h2>
      <div className={`mt-3 h-1 w-16 bg-mustard rounded-full ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

export default function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 md:px-6 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
