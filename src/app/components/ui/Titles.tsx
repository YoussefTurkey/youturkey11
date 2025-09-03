type TTitle = {
  children: React.ReactNode,
  style?: string
}

const Titles = ({ children, style }: TTitle) => {
  return (
    <h2 className={`${style} pb-5 text-center capitalize font-bold text-3xl bg-gradient-to-t from-[#b2b2b2] to-[hsl(var(--foreground))] bg-clip-text text-transparent`}>
      {children}
    </h2>
  );
};

export default Titles;
