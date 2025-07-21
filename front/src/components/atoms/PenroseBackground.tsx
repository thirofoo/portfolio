export const PenroseBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950">
      <div className="absolute inset-0 h-full w-full bg-[url('/patterns/light-pattern.svg')] bg-repeat dark:hidden" />
      <div className="absolute inset-0 hidden h-full w-full bg-[url('/patterns/dark-pattern.svg')] bg-repeat dark:block" />
    </div>
  );
};
