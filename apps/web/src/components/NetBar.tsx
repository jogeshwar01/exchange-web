export const NetBar = ({ market }: { market: string }) => {
  return (
    <div className="inline-flex items-center justify-center w-full h-full bg-container-bg thin-scroll">
      <div className="z-40 h-full flex flex-row w-full items-center justify-center gap-2 bg-container-bg text-text-default border border-container-border relative hover:bg-container-bg-hover sm:p-2"></div>
    </div>
  );
};
