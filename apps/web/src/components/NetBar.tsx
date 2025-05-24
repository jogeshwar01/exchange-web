import Github from "./icons/Github";
import Twitter from "./icons/Twitter";

export const NetBar = () => {
  return (
    <div className="inline-flex items-center justify-center w-full h-full thin-scroll">
      <div className="z-40 h-full flex flex-row w-full items-center justify-center bg-container-bg text-text-default border border-container-border rounded-xl relative sm:p-2 overflow-hidden">
        <a
          href="https://github.com/jogeshwar01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-md flex-1 h-full cursor-pointer hover:bg-container-bg-hover rounded-xl"
        >
          <Github className="mr-4" />
          <span>Github</span>
        </a>

        <a
          href="https://x.com/jogeshwar01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-md flex-1 h-full cursor-pointer hover:bg-container-bg-hover rounded-xl"
        >
          <Twitter className="mr-4" />
          <span>Twitter</span>
        </a>
      </div>
    </div>
  );
};
