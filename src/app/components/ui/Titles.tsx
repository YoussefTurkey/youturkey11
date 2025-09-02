const Titles = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="pb-5 text-center capitalize font-bold text-3xl bg-gradient-to-t from-[#b2b2b2] to-[hsl(var(--foreground))] bg-clip-text text-transparent">
      {children}
    </h2>
  );
};

export default Titles;
